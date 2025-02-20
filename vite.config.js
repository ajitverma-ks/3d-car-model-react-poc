import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg", "**/*.mp4", "**/*.webp"], // ✅ Allows loading 3D models and images
});