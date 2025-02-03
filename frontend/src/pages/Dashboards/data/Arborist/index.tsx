import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tree } from "react-arborist"; // Import Tree and Node for proper typing
import DeleteModal from "Common/DeleteModal";

import axios from "axios";

type Device = {
  id: number;
  name: string;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate?: string;
  status: "active" | "inactive" | "retired";
};

type Equipment = {
  id: number;
  name: string;
  serialNumber: string;
  purchaseDate?: string;
  equipmentTypeId?: number;
  createdAt: string;
  updatedAt: string;
  devices: Device[]; // Associated devices
};
type TreeNodeType = {
  id: number | string; // ID of the node
  name: string; // Name to display
  isLeaf: boolean; // If true, the node is a leaf (e.g., a device)
  children?: TreeNodeType[]; // Nested children
};

const Arborist = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState<TreeNodeType[]>([]); // Default to an empty array
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState<string | null>(null); // State for errors

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const navigateToPost = (url: any) => {
    navigate(url); // Navigate to /post/:id
  };
  // Fetch equipment data and transform it into tree structure
  const fetchEquipment = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Clear any previous errors

      // Fetch equipment data from the API
      const response = await axios.get<Equipment[]>(
        `${API_URL}/equipment/equipment`
      );
      console.log("yes");

      // Transform equipment data into a tree structure
      const transformedTreeData = response.data.map((equipment) => ({
        id: `equipment-${equipment.id}`, // Unique ID for each equipment
        name: equipment.name, // Equipment name
        isLeaf: false, // Equipment is not a leaf node
        children: equipment.devices.map((device) => ({
          id: `device-${device.id}`, // Unique ID for each device
          name: `${device.name} (${device.model})`, // Device name with model
          isLeaf: true, // Devices are leaf nodes
        })),
      }));
      console.log(transformedTreeData);
      // Set the transformed data as the tree structure
      setTreeData(transformedTreeData);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
      setError("Failed to fetch equipment data. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEquipment();
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <div className="card mt-10">
        <div className="card-body">
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/DefinEquipment")}
              className="text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-100 active:text-white active:bg-sky-600 active:border-sky-600 active:ring active:ring-sky-100 dark:ring-sky-400/20"
            >
              تعریف تچهیزات
            </button>
            <button
              onClickCapture={() => navigate("/TypeEquipment")}
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
    </React.Fragment>
  );
};
// Custom node renderer for the Tree component
// NodeRenderer component
// Custom NodeRenderer component for rendering each node
// Custom NodeRenderer component for rendering each node
// NodeRenderer for rendering each node
const NodeRenderer = <T extends TreeNodeType>({
  node,
  style,
}: {
  node: { data: T; isLeaf: boolean; toggle: () => void; isOpen: boolean }; // Ensure `toggle` and `isOpen` are available
  style: React.CSSProperties; // Inline styles for the node
}) => {
  return (
    <div
      style={style}
      className="cursor-pointer flex items-center"
      onClick={() => node.toggle()} // Properly call node.toggle
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
