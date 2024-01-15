/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/


import { useAnimations, useFBX, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { useMobile } from "../hooks/useMobile";

export function Sandrio (props) {
  const { nodes, materials } = useGLTF("/models/sandrio.glb");
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: walkingAnimation } = useFBX("/animations/Walking.fbx");

  idleAnimation[0].name = "Idle";
  walkingAnimation[0].name = "Walking";
  const group = useRef();
  const { actions } = useAnimations(
    [idleAnimation[0], walkingAnimation[0]],
    group
  );

  const [animation, setAnimation] = useState("Idle");
  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  const scrollData = useScroll();
  const lastScroll = useRef(0);
  const { isMobile } = useMobile();

  useFrame(() => {
    const scrollDelta = scrollData.offset - lastScroll.current;
    let rotationTarget = 0;
    if (Math.abs(scrollDelta) > 0.00001) {
      setAnimation("Walking");
      if (scrollDelta > 0) {
        rotationTarget = isMobile ? Math.PI / 2 : 0;
      } else {
        rotationTarget = isMobile ? -Math.PI / 2 : Math.PI;
      }
    } else {
      setAnimation("Idle");
    }
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      rotationTarget,
      0.1
    );
    lastScroll.current = scrollData.offset;
  });
  return (
    <group {...props} dispose={null} ref={group}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.025}>
        <skinnedMesh
          geometry={nodes.Sandshrew_Roll.geometry}
          material={materials["Material #47"]}
          skeleton={nodes.Sandshrew_Roll.skeleton}
        />
        <primitive object={nodes.pm0027_00} />
        <skinnedMesh
          geometry={nodes.Mesh.geometry}
          material={materials["Material #35"]}
          skeleton={nodes.Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_1.geometry}
          material={materials["Material #36"]}
          skeleton={nodes.Mesh_1.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/sandrio.glb");