import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshReflectorMaterial } from "@react-three/drei";
export default function PlaneTexture() {
  const materialRef = useRef();

  const planeTextures = useTexture({
    map: "/textures/Plane1/color.png",
    aoMap: "/textures/Plane1/AO.png",
    normalMap: "/textures/Plane1/normal.png",
    roughnessMap: "/textures/Plane1/roughness.png",
    metalnessMap: "/textures/Plane1/metalness.png",
    displacementMap: "/textures/Plane1/displacement.png",
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.map.minFilter = THREE.NearestFilter;
      materialRef.current.aoMap.minFilter = THREE.NearestFilter;
      materialRef.current.normalMap.minFilter = THREE.NearestFilter;
      materialRef.current.roughnessMap.minFilter = THREE.NearestFilter;
      materialRef.current.metalnessMap.minFilter = THREE.NearestFilter;
      materialRef.current.displacementMap.minFilter = THREE.NearestFilter;
    }
  }, []);
  return (
    <>
      <mesh position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        {/* <meshStandardMaterial
        ref={materialRef}
         {...planeTextures}
         displacementScale={0.1}
        /> */}
        <MeshReflectorMaterial
          color="#171720"
          resolution={1024}
          roughness={0.6}
          mixStrength={3}
        />
      </mesh>
    </>
  );
}
