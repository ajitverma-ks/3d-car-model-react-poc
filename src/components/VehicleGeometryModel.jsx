import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const vehicleTypes = {
  car: { size: [4, 1.5, 8], wheels: 4, cabinSize: [3.5, 1.2, 5.5], hoodSize: [3.5, 1, 2] },
  truck: { size: [6, 3, 14], wheels: 6, cabinSize: [4, 2.5, 5], hoodSize: [4, 2, 3] },
  suv: { size: [5, 2, 9], wheels: 4, cabinSize: [4.5, 1.8, 6.5], hoodSize: [4.5, 1.2, 2] },
  bus: { size: [10, 3.5, 22], wheels: 8, cabinSize: [10, 3.2, 20], hoodSize: [0, 0, 0] },
  van: { size: [5.5, 2.2, 10], wheels: 4, cabinSize: [5.5, 2, 8], hoodSize: [0, 0, 0] },
  trailer: { size: [8, 2.5, 15], wheels: 6, cabinSize: [8, 2.5, 15], hoodSize: [0, 0, 0] },
};

function VehicleGeometryModel({ texture, type }) {
  const { size, wheels, cabinSize, hoodSize } = vehicleTypes[type] || vehicleTypes.car;
  const vehicleGroup = new THREE.Group();

  // Cabin (Main body)
  const cabinGeometry = new THREE.BoxGeometry(...cabinSize);
  const bodyMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
  cabin.position.y = cabinSize[1] / 2;
  vehicleGroup.add(cabin);

  // Hood (for trucks and cars)
  if (hoodSize[2] > 0) {
    const hoodGeometry = new THREE.BoxGeometry(...hoodSize);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.set(0, hoodSize[1] / 2, -cabinSize[2] / 2 - hoodSize[2] / 2);
    vehicleGroup.add(hood);
  }

  // Wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1, 32);
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: "black" });
  const wheelOffset = size[0] / 2 - 0.8;
  
  const positions = [
    [-wheelOffset, 0.5, -size[2] / 3],
    [wheelOffset, 0.5, -size[2] / 3],
    [-wheelOffset, 0.5, size[2] / 3],
    [wheelOffset, 0.5, size[2] / 3],
  ];
  if (wheels > 4) {
    positions.push([-wheelOffset, 0.5, 0], [wheelOffset, 0.5, 0]);
  }
  if (wheels > 6) {
    positions.push([-wheelOffset, 0.5, size[2] / 2.5], [wheelOffset, 0.5, size[2] / 2.5]);
  }

  positions.forEach(([x, y, z]) => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, y, z);
    vehicleGroup.add(wheel);
  });

  return <primitive object={vehicleGroup} />;
}

export default function Vehicle3DWrapDemo() {
  const dummyTextures = [
    "https://dummyimage.com/512x512/ff0000/ffffff.png",
    "https://dummyimage.com/512x512/00ff00/ffffff.png",
    "https://dummyimage.com/512x512/0000ff/ffffff.png",
  ];
  const [texture, setTexture] = useState("https://dummyimage.com/512x512/0000ff/ffffff.png");
  const [vehicleType, setVehicleType] = useState("car");

  const loadTexture = (url) => {
    const loadedTexture = new THREE.TextureLoader().load(url);
    setTexture(loadedTexture);
  };

  useEffect(() => {
    const loadedTexture = new THREE.TextureLoader().load(texture);
    setTexture(loadedTexture);
  }, [])

  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      <Canvas camera={{ position: [15, 10, 25] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        {texture && <VehicleGeometryModel texture={texture} type={vehicleType} />}
        <OrbitControls />
      </Canvas>
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px" }}>
        {dummyTextures.map((url, index) => (
          <button key={index} onClick={() => loadTexture(url)}>
            Texture {index + 1}
          </button>
        ))}
      </div>
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px" }}>
        {Object.keys(vehicleTypes).map((type) => (
          <button key={type} onClick={() => setVehicleType(type)}>
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
