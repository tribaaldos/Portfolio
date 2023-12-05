import { Scroll, ScrollControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { LoadingScreen } from "./components/LoadingScreen";
import { Menu } from "./components/Menu";
import { config } from "./config";

function App() {
  return (
    <>
      <LoadingScreen />
      <Canvas camera={{ position: [0, 2, 8], fov: 42 }}>
        <Sky />
        {/* <color attach="background" args={["#f5f3ee"]} /> */}
        {/* <fog attach="fog" args={["#f5f3ee", 10, 50]} /> */}
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["red", 1, 50]} />
        <ScrollControls
          pages={config.sections.length}
          damping={0.1}
          maxSpeed={0.2}
        >
          <group position-y={-1}>
            <MotionConfig
              transition={{
                duration: 0.6,
              }}
            >
              <Suspense>
                <Experience />
              </Suspense>
            </MotionConfig>
          </group>
          <Scroll html>
            <MotionConfig transition={{ duration: 1 }}>
              <Interface />
            </MotionConfig>
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu />
      {/* */}
    </>
  );
}

export default App;
