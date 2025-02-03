import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tree } from "react-arborist";
import axios from "axios";

// Base tree node type for react-arborist.
type TreeNodeType = {
  id: number | string; // Unique identifier
  name: string;        // Display name
  isLeaf: boolean;     // Whether this node is a leaf
  children?: TreeNodeType[]; // Nested children (if any)
};

// Raw equipment record from your API
interface EquipmentRecord {
  id: number;
  name: string;
  equipmentTypeId: number;
  createdAt: string;
  updatedAt: string;
  placeId: string | null;
  serialNumber: string;
  guaranteeEnd: string | null;
  Propertynumber: string | null;
  description: string | null;
  deviceId: number | null; // (Ignored in this grouping)
}

// A tree node for equipment. (Used for both equipment type and equipment nodes.)
interface EquipmentTreeNode extends TreeNodeType {
  equipmentTypeId: number;
  children: EquipmentTreeNode[]; // Always have a children array (may be empty)
}

const Arborist = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState<EquipmentTreeNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Fetch equipment data, group by equipmentTypeId, and update the parent's name using the equipment-types endpoint.
  const fetchEquipment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all equipment records.
      const response = await axios.get<EquipmentRecord[]>(
        `${API_URL}/equipment/equipment`
      );

      // Group equipment records by equipmentTypeId.
      const equipmentGroups: { [key: number]: EquipmentTreeNode } = {};

      response.data.forEach((record) => {
        // If we haven't created a parent node for this equipment type yet, do so.
        if (!equipmentGroups[record.equipmentTypeId]) {
          equipmentGroups[record.equipmentTypeId] = {
            id: `equipment-type-${record.equipmentTypeId}`,
            // Set a default name; this will be updated after fetching the equipment type details.
            name: `Equipment Type ${record.equipmentTypeId}`,
            equipmentTypeId: record.equipmentTypeId,
            isLeaf: false,
            children: [],
          };
        }
        // Create a node for the equipment record.
        const equipmentNode: EquipmentTreeNode = {
          id: `equipment-${record.id}`,
          name: record.name,
          equipmentTypeId: record.equipmentTypeId,
          isLeaf: true,
          children: [],
        };

        // Add the equipment record node as a child of its corresponding equipment type node.
        equipmentGroups[record.equipmentTypeId].children.push(equipmentNode);
      });

      // For each unique equipmentTypeId, fetch the equipment type details.
      const equipmentTypeIds = Object.keys(equipmentGroups);
      await Promise.all(
        equipmentTypeIds.map(async (typeIdStr) => {
          const typeId = Number(typeIdStr);
          try {
            const typeResponse = await axios.get(
              `${API_URL}/equipment/equipment-types/${typeId}`
            );
            // Assume the response returns an object with a "name" property.
            equipmentGroups[typeId].name =
              typeResponse.data.name || equipmentGroups[typeId].name;
          } catch (err) {
            console.error(`Failed to fetch equipment type ${typeId}`, err);
            // If the API call fails, the node will retain its default name.
          }
        })
      );

      // Convert the groups into an array for the tree.
      const finalTree: EquipmentTreeNode[] = Object.values(equipmentGroups);
      setTreeData(finalTree);
    } catch (err) {
      console.error("Error fetching equipment data:", err);
      setError("Failed to fetch equipment data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts.
  useEffect(() => {
    fetchEquipment();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="card mt-10">
        <div className="card-body">
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/DefinEquipment")}
              className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
            >
              تعریف تجهیزات
            </button>
            <button
              onClick={() => navigate("/TypeEquipment")}
              className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
            >
              تعریف نوع تجهیزات
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-2">
        <div className="card-body flex justify-center">
          <Tree
            data={treeData}
            idAccessor="id"
            childrenAccessor="children"
            openByDefault={true}
            width={600}
            height={400}
            rowHeight={30}
          >
            {NodeRenderer}
          </Tree>
        </div>
      </div>
    </>
  );
};

// Custom node renderer for react-arborist.
const NodeRenderer = <T extends TreeNodeType>({
  node,
  style,
}: {
  node: { data: T; isLeaf: boolean; toggle: () => void; isOpen: boolean };
  style: React.CSSProperties;
}) => {
  return (
    <div
      style={style}
      className="cursor-pointer flex items-center"
      onClick={() => node.toggle()}
    >
      {node.isLeaf ? (
        <span>📱 {node.data.name}</span>
      ) : (
        <span>
          {node.isOpen ? "📂" : "📁"} {node.data.name}
        </span>
      )}
    </div>
  );
};

export default Arborist;
