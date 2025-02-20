import { useState } from "react";
import VehicleWrapDemo from "./components/VehicleWrapDemo";
import VehicleGeometryModel from "./components/VehicleGeometryModel";
import "./index.css";

export default function App() {
  const [showWrapDemo, setShowWrapDemo] = useState(true);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px", position: "relative" }}>
        <button
          onClick={() => setShowWrapDemo(!showWrapDemo)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          {showWrapDemo ? "Show Geometry Model" : "Show 3D Model"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        {showWrapDemo ? <VehicleWrapDemo /> : <VehicleGeometryModel />}
      </div>
    </>
  );
}
