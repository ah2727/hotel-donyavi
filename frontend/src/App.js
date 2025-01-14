import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Import the Layout component

export default function App() {
  return (
    <Router>
      <Layout> {/* Wrap the routes with Layout */}
        <Routes> {/* Use Routes instead of Switch */}
          
        </Routes>
      </Layout>
    </Router>
  );
}
