import React, { useRef, useState } from "react"

import {useFrame} from "react-three-fiber"

const Icosahedron = ({position, radius,color}) => {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame(({mouse}) => {
    mesh.current.rotation.x = mesh.current.rotation.y += -0.005
  })
  return (
    <mesh
      castShadow
      ref = {mesh}
      position={position}
      scale={active ? [1.75,1.75,1.75] : [1.5,1.5,1.5]}
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