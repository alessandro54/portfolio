import React, { useEffect, useRef, useState } from "react"

import {Canvas, useFrame} from "react-three-fiber";
import { PerspectiveCamera, softShadows, Stars } from "drei"
import Icosahedron from "./Icosahedron"

softShadows();
const GROUND_HEIGHT = -20;
const Terrain = () => {
  const terrain = useRef();

  useFrame(() => {
    terrain.current.position.z += 0.01;
  });
  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}

const Background = () => {
  const [dimensions, setDimensions] = useState({});
  const cam = useRef();
  const handleResize = () => {
    setDimensions({ x: window.innerWidth, y: window.innerHeight})
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ x: window.innerWidth, y: window.innerHeight})
    }
  },[])
  useEffect(()=> {
    if (typeof  window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  },[dimensions])

  return (
    //Here goes the 3D background
    <Canvas
      shadowMap
      style={{backgroundColor:`lightblue`,zIndex:3,width:dimensions.x, height:dimensions.y, position:"fixed",top:0,left:0}}
      colorManagement
    >
      <PerspectiveCamera
        ref = {cam}
        fov={60}
        rotateX={-Math.PI}
        
        position={[-4,0,0]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10,0,-20]} intensity={0.5}/>
        <pointLight position={[0,-10,0]} intensity={1.5}/>
        <group>
          <mesh
            rotation={[-Math.PI/2,0,0]}
            position={[0,-3,0]}
            receiveShadow>
            <planeBufferGeometry attach={'geometry'} args={[100,100]}/>
            <shadowMaterial attach={'material'} opacity={0.3}/>
          </mesh>
        </group>
        <Icosahedron position={[-3,0,-5]} color={'#F0E181'} radius={40} rotation={0.005}/>
        <Icosahedron position={[8,0,0]} color={'lightblue'} radius={60} rotation={-0.005}/>
        <Icosahedron position={[2,3,0]} color={'pink'} radius={100} rotation={0.008}/>
        <Terrain/>
        <Stars/>
      </PerspectiveCamera>
    </Canvas>
  )
}


export default Background;