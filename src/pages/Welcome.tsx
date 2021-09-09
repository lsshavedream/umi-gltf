import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { Html, useProgress, Stage } from "@react-three/drei";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/duanluqi3.gltf");
  return (
    <>
      <primitive scale={14} object={gltf.scene} />
    </>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const App = () => {
  const ref = useRef();
  return (
    <>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 250], fov: 20 }}
      >
        <ambientLight intensity={2} />
        <pointLight intensity={2} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={1}
          angle={1}
          penumbra={0.5}
          position={[250, 25, 250]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <Suspense fallback={<Loader />}>
          <OrbitControls
            controls={ref}
            enablePan={true}
            enableZoom={true}
            enableDamping
            dampingFactor={1}
            rotateSpeed={0.9}
            autoRotate={true}
          />
          <Model />
          {/* <Stage controls={ref} contactShadow={true} shadows={true} intensity={1} environment="city" preset="rembrandt">
            <Model />
          </Stage> */}
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
