import React, { useEffect, useRef, useState } from "react"

import {Canvas, useFrame} from "react-three-fiber";
import { OrbitControls, softShadows } from "drei"

softShadows();
const SpinningMesh = ({position, args, color}) => {

  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh castShadow ref={mesh}
          position={position}
          onPointerUp={e => console.log('up')}
    >
      <boxBufferGeometry attach={'geometry'} args = {args}/>
      <meshStandardMaterial attach={'material'} color={color} transparent opacity={0.7}/>
    </mesh>
  )
}


const Background = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight)
  const handleResize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth)
  }
  useEffect(()=> {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])
  return (
    //Here goes the 3D background
    <Canvas
      shadowMap
      style={{backgroundColor:"lightblue",zIndex:-1,width:width, height:height, position:"fixed",top:0,left:0}}
      colorManagement
      camera={{position: [-5,2,10],fov:40}}>
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
      <SpinningMesh position = {[0,1,0]} args={[3,2,1]} color={'lightblue'}/>
      <SpinningMesh position = {[-2,1,-5]} color = {'pink'}/>
      <SpinningMesh position = {[5,1,-2]} color={'lightblue'}/>
    </Canvas>
  )
}


export default Background;