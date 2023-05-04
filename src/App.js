import { CubeCamera, Environment, OrbitControls, PerspectiveCamera, Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from "postprocessing"
import React, { Suspense, lazy } from 'react';
import { DepthFormat } from 'three';
import { Boxes } from './Boxes';
import { Car } from './Car';
import { FloatingGrid } from './FloatingGrid';
import { Ground } from './Ground';
import { Rings } from './Rings';
import "./style.css"
// import StatsComponent from "./Stats"
const StatsComponent = lazy(() => new Promise((resolve) =>
  setTimeout(() => resolve(import("./Stats")), 5000)
));

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <spotLight color={[1, 0.25, 0.7]} intensity={3} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />

      <spotLight color={[0.14, 0.5, 1]} intensity={5} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <Rings />
      <Boxes />

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh> */}

      <Ground />
      <FloatingGrid />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.95}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]} />
      </EffectComposer>
    </>
  )
}

function App() {
  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Canvas shadows>
        <Suspense fallback={null}>
          <Suspense fallback={null}>
            <StatsComponent />
          </Suspense>
          <CarShow></CarShow>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

export default App;
