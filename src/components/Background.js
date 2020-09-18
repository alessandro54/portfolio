import React, { useEffect, useRef, useState } from "react"

import {Canvas, useFrame} from "react-three-fiber";
import {softShadows} from "drei"

softShadows();
const SpinningMesh = ({position, args, color}) => {

  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh} position={position}>
      <boxBufferGeometry attach={'geometry'} args = {args}/>
      <meshStandardMaterial attach={'material'} color={color}/>
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
    <Canvas style={{backgroundColor:"lightblue",zIndex:-1,width:width, height:height, position:"fixed",top:0,left:0}} colorManagement camera={{position: [-5,2,10],fov:35}}>
      <ambientLight intensity={0.3} />
      <pointLight position={[-10,0,-20]} intensity={0.5}/>
      <pointLight position={[0,-10,0]} intensity={1.5}/>
      <SpinningMesh position = {[0,1,0]} args={[3,2,1]} color={'lightblue'}/>
      <SpinningMesh position = {[-2,1,-5]} color = {'pink'}/>
      <SpinningMesh position = {[5,1,-2]} color={'lightblue'}/>
    </Canvas>
  )
}


export default Background;