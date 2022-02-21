import React, { useRef, useState } from "react"

import {useFrame} from "@react-three/fiber"


const Icosahedron = ({position, radius,color, rotation}) => {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [hoverColor, setHoverColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16)}`)

  useFrame(({mouse}) => {
    mesh.current.rotation.x = mesh.current.rotation.y += rotation ;
  })

  const handleHoverIn = () => {
    setHover(true)
    setHoverColor(`#${Math.floor(Math.random()*16777215).toString(16)}`)
  }
  return (
    <mesh
      castShadow
      ref = {mesh}
      position={position}
      scale={active ? [1.5,1.5,1.5] : [2.5,2.5,2.5]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => handleHoverIn()}
      onPointerOut={(e) => setHover(false)}
    >
      <icosahedronBufferGeometry radius = {radius} attach = {'geometry'}/>
      <meshStandardMaterial color = {hovered ? hoverColor : color} attach={'material'}/>
    </mesh>
  )
}

export default Icosahedron