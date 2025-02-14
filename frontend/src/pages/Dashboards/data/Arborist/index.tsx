import React, { useState, useEffect, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Tree, NodeApi } from "react-arborist";
import axios from "axios";

// types.ts
export interface EquipmentTypeData {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deviceTypeId: number | null;
  deviceType: any; // Update this type if you have a proper DeviceType interface
}

export interface EquipmentRecord {
  id: number;
  name: string;
  equipmentTypeId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  placeId: string | null;
  equipmentType: EquipmentTypeData; // This property is returned by the API.
}

export interface EquipmentTreeNode {
  id: number;
  name: string;
  children: EquipmentTreeNode[];
  isEquipmentType?: boolean;
  isEquipment?: boolean;
  description?: string;
}

const Arborist: React.FC = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState<EquipmentTreeNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Declare contextMenu state.
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    node: EquipmentTreeNode | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Fetch equipment data and group it into a tree structure.
  const fetchEquipment = async () => {
    try {
      setLoading(true);
      setError(null);

      // The API is expected to return: { data: EquipmentRecord[] }
      const response = await axios.get(
        `${API_URL}/equipment/get-arborist`
      );
      const records: EquipmentRecord[] = response.data;

      // Group equipment records by equipmentType.id.
      const equipmentGroups: { [key: number]: EquipmentTreeNode } = {};

      records.forEach((item) => {
        const eqType = item.equipmentType;
        if (!equipmentGroups[eqType.id]) {
          equipmentGroups[eqType.id] = {
            id: eqType.id,
            name: eqType.name,
            children: [],
            isEquipmentType: true,
          };
        }
        // Add the equipment item as a child node.
        equipmentGroups[eqType.id].children.push({
          id: item.id,
          name: item.name,
          description: item.description,
          children: [],
          isEquipment: true,
        });
      });

      // Convert the groups into an array.
      const finalTree: EquipmentTreeNode[] = Object.values(equipmentGroups);
      setTreeData(finalTree);
    } catch (err: any) {
      console.error("Error fetching equipment data:", err);
      setError("Failed to fetch equipment data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle right-click on a node.
  const handleRightClick = (e: MouseEvent, node: EquipmentTreeNode) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      node: node,
    });
  };

  // Handle click on a node.
  // For equipment types, navigate to their detail page.
  const handleClick = (node: EquipmentTreeNode) => {

  };

  // Hide context menu when clicking outside.
  const handleClickOutside = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    fetchEquipment();
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [contextMenu.visible]);

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
          <Tree<EquipmentTreeNode> data={treeData} childrenAccessor="children">
            {({ node, style }: { node: NodeApi<EquipmentTreeNode>; style: React.CSSProperties }) => (
              <div
                style={style}
                onContextMenu={(e) => handleRightClick(e, node.data)}
              >
                {node.data.name}{" "}
                {node.data.isEquipment ? (
                  <span style={{ fontStyle: "italic", color: "#666" }}>
                    (Equipment)
                  </span>
                ) : (
                  <span style={{ fontWeight: "bold" }}>(Type)</span>
                )}
              </div>
            )}
          </Tree>

          {contextMenu.visible && (
            <div
              className="context-menu"
              style={{
                position: "absolute",
                top: contextMenu.y,
                left: contextMenu.x,
                backgroundColor: "#darkblue",
                border: "1px solid #ccc",
                zIndex: 1000,
                boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="context-menu-item"
                onClick={() => {
                  console.log("Delete option clicked for", contextMenu.node);
                  // If a node is selected, send a DELETE request to delete it.
                  if (contextMenu.node) {
                    axios
                      .delete(`${API_URL}/equipment/equipment/${contextMenu.node.id}`)
                      .then(() => {
                        // After successful deletion, refresh the tree data.
                        fetchEquipment();
                      })
                      .catch((err) => {
                        console.error("Error deleting equipment:", err);
                      });
                  }
                  setContextMenu({ ...contextMenu, visible: false });
                }}
              >
                Delete
              </div>
              <div
                className="context-menu-item"
                onClick={() => {
                  console.log("Add option clicked for", contextMenu.node);
                  // Check if the clicked node is an equipment type.
                  if (contextMenu.node?.isEquipmentType) {
                    // Navigate to add an equipment type.
                    navigate("/TypeEquipment");
                  } else {
                    // Otherwise, navigate to add an equipment item.
                    navigate("/DefinEquipment");
                  }
                  setContextMenu({ ...contextMenu, visible: false });
                }}
              >
                Add
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Arborist;
