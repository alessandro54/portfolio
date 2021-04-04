import React, { useRef, useState } from "react"

import {useFrame} from "@react-three/fiber"

const Icosahedron = ({position, radius,color, rotation}) => {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame(({mouse}) => {
    mesh.current.rotation.x = mesh.current.rotation.y += rotation ;
  })
  return (
    <mesh
      castShadow
      ref = {mesh}
      position={position}
      scale={active ? [1,1,1] : [2,2,2]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <icosahedronBufferGeometry radius = {radius} attach = {'geometry'}/>
      <meshStandardMaterial color = {hovered ? `orange` : color} attach={'material'}/>
    </mesh>
  )
}

export default Icosahedron