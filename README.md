# 3D Vehicle Wrap POC Summary

## Prerequisites
- **3D Models**: Need to add different vehicle models. Models can be downloaded from [Sketchfab](https://sketchfab.com/3d-models/).
- **Asset Handling**: `.glb` models used for rendering 3D models in the application.

## Libraries Used
- **@react-three/fiber**: For rendering 3D objects in React.
- **@react-three/drei**: Helper utilities for loading GLTF models and textures.

## Implementation Details
### 1. **3D Model Loading**
- Used `useGLTF("/models/vehicle.glb")` to dynamically load vehicle models.
- Enabled traversal of model materials to apply wrap textures.

### 2. **Component Functionality**
- **VehicleModel Component**:
  - Loads the 3D vehicle model using `useGLTF`.
  - Applies wrap textures to specific parts of the vehicle (e.g., `backside` material).
  - Ensures the texture updates correctly using `mat.needsUpdate = true`.

- **VehicleWrapDemo Component**:
  - Displays the full-page 3D wrap preview.
  - Renders the `Canvas` with `OrbitControls` for user interaction.
  - Allows users to switch between different wrap textures by clicking on thumbnails.

## Difficulty if Not Using 3D Models
- If downloadable 3D models are not used, vehicle geometry would need to be manually created using Three.js primitives like `BoxGeometry`, `CylinderGeometry`, etc.
- This approach significantly increases development complexity and does not provide a realistic UI representation.
- Manually modeling vehicles would require extensive effort, including mapping UVs correctly for wrap textures.
- Using `.glb` models simplifies implementation, improves rendering performance, and enhances the visual appeal of the application.