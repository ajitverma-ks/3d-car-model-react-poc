import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import vehicleModel from "../assets/low_poly_truck.glb";
import "./VehicleWrapDemo.css";
import warp1 from "../assets/wrap1.jpg";
import warp2 from "../assets/wrap2.jpg";
import warp3 from "../assets/wrap3.jpg";


const VehicleModel = ({ wrapTexture }) => {
  const { scene } = useGLTF(vehicleModel);
  const texture = useTexture(wrapTexture);
  
  scene.traverse((child) => {
    if (child.isMesh) {
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => {
          if (mat.name === "backside") { // Apply texture only to the body
            mat.map = texture;
            mat.needsUpdate = true;
          }
        });
      } else {
        console.log("Material name:", child.material.name);
        if (child.material.name === "backside") { // Apply if it's a single material
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      }
    }
  });
  
  

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

const VehicleWrapDemo = () => {
  const [wrapImage, setWrapImage] = useState(warp1);

  const wrapOptions = [
    warp1, warp2, warp3
  ];

  return (
    <div className="full-page-container">
      <h1 className="modal-title">3D Vehicle Wrap Preview</h1>
      <div className="canvas-container">
      <Canvas frameloop="demand" camera={{ position: [-13, 3, 6], fov: 45, near: 0.1, far: 200 }}> 
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <OrbitControls enableZoom={true} enableRotate={true} enablePan={true}  />
          <VehicleModel wrapTexture={wrapImage} />
        </Canvas>
      </div>
      <div className="wrap-selection">
        {wrapOptions.map((wrap, index) => (
          <img key={index} src={wrap} alt="Wrap" className="wrap-option" onClick={() => setWrapImage(wrap)} />
        ))}
      </div>
    </div>
  );
};

export default VehicleWrapDemo;
