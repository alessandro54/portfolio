import React, { useEffect, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Stars,
  Reflector,
  useTexture,
  CameraShake,
  OrbitControls,
  ReflectorProps,
} from "@react-three/drei"
import { KernelSize } from "postprocessing"
import Icosahedron from "./Icosahedron"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events"

const Terrain = (
  props: JSX.IntrinsicAttributes &
    Pick<
      ReflectorProps,
      | "attach"
      | "args"
      | "children"
      | "key"
      | "onUpdate"
      | "position"
      | "up"
      | "scale"
      | "rotation"
      | "matrix"
      | "quaternion"
      | "layers"
      | "dispose"
      | "geometry"
      | "material"
      | "morphTargetInfluences"
      | "morphTargetDictionary"
      | "isMesh"
      | "type"
      | "updateMorphTargets"
      | "raycast"
      | "id"
      | "uuid"
      | "name"
      | "parent"
      | "modelViewMatrix"
      | "normalMatrix"
      | "matrixWorld"
      | "matrixAutoUpdate"
      | "matrixWorldNeedsUpdate"
      | "visible"
      | "castShadow"
      | "receiveShadow"
      | "frustumCulled"
      | "renderOrder"
      | "animations"
      | "userData"
      | "customDepthMaterial"
      | "customDistanceMaterial"
      | "isObject3D"
      | "onBeforeRender"
      | "onAfterRender"
      | "applyMatrix4"
      | "applyQuaternion"
      | "setRotationFromAxisAngle"
      | "setRotationFromEuler"
      | "setRotationFromMatrix"
      | "setRotationFromQuaternion"
      | "rotateOnAxis"
      | "rotateOnWorldAxis"
      | "rotateX"
      | "rotateY"
      | "rotateZ"
      | "translateOnAxis"
      | "translateX"
      | "translateY"
      | "translateZ"
      | "localToWorld"
      | "worldToLocal"
      | "lookAt"
      | "add"
      | "remove"
      | "removeFromParent"
      | "clear"
      | "getObjectById"
      | "getObjectByName"
      | "getObjectByProperty"
      | "getWorldPosition"
      | "getWorldQuaternion"
      | "getWorldScale"
      | "getWorldDirection"
      | "traverse"
      | "traverseVisible"
      | "traverseAncestors"
      | "updateMatrix"
      | "updateMatrixWorld"
      | "updateWorldMatrix"
      | "toJSON"
      | "clone"
      | "copy"
      | "addEventListener"
      | "hasEventListener"
      | "removeEventListener"
      | "dispatchEvent"
      | keyof EventHandlers
      | "blur"
      | "resolution"
      | "minDepthThreshold"
      | "maxDepthThreshold"
      | "depthScale"
      | "depthToBlurRatioBias"
      | "mixBlur"
      | "mixStrength"
      | "mirror"
      | "distortion"
      | "mixContrast"
      | "distortionMap"
      | "debug"
    > &
    React.RefAttributes<
      THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    >
) => {
  const [floor, normal] = useTexture(["/floor.jpeg", "/normal.jpeg"])
  return (
    <Reflector resolution={1024} args={[40, 80]} {...props}>
      {(Material, props) => (
        <Material
          color="#f0f0f0"
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={new THREE.Vector2(2, 2)}
          {...props}
        />
      )}
    </Reflector>
  )
}
const Rig = () => {
  const [vec] = useState(() => new THREE.Vector3())
  const { camera, mouse } = useThree()
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 15), 0.01))
  return (
    <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
  )
}

const Background = () => {
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 })
  const handleResize = () => {
    setDimensions({ x: window.innerWidth, y: window.innerHeight })
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ x: window.innerWidth, y: window.innerHeight })
    }
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [dimensions])

  return (
    //Here goes the 3D background
    <Canvas
      style={{
        backgroundColor: "black",
        zIndex: 3,
        width: dimensions.x,
        height: dimensions.y,
        position: "fixed",
        top: 0,
        left: 0,
      }}
      camera={{ position: [0, 0, 14] }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <group>
          <Icosahedron
            position={[-12, 1, 2]}
            color={"#d673fa"}
            rotation={0.001}
          />
          <Icosahedron
            position={[5, 1, 7]}
            color={"#88dff7"}
            rotation={-0.001}
          />
          <Icosahedron
            position={[3, 8, -1]}
            color={"#f2d1b8"}
            rotation={0.001}
          />
          <Icosahedron
            position={[-8, 6, -7]}
            color={"#979bfc"}
            rotation={0.006}
          />
          <Terrain
            mirror={4}
            blur={[500, 400]}
            mixBlur={10}
            mixStrength={1.5}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            position-y={-2.5}
          />
        </group>
        <EffectComposer multisampling={8}>
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.5}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={0.5}
          />
        </EffectComposer>
      </Suspense>
      <ambientLight intensity={0.3} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <directionalLight
        castShadow
        position={[0, 5, 0]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Stars />
      <Rig />
    </Canvas>
  )
}

export default Background
