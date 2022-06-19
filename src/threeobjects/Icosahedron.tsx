import React, { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

interface IcosahedronProps {
  position: [number, number, number]
  color: string
  rotation: number
}

const Icosahedron = ({ position, color, rotation }: IcosahedronProps) => {
  const mesh = useRef<any>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [hoverColor, setHoverColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  )

  useFrame(({ mouse }) => {
    mesh.current.rotation.x = mesh.current.rotation.y += rotation
  })

  const handleHoverIn = () => {
    setHover(true)
    setHoverColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
  }
  return (
    <mesh
      castShadow
      ref={mesh}
      position={position}
      scale={active ? [1.5, 1.5, 1.5] : [2.5, 2.5, 2.5]}
      onClick={e => setActive(!active)}
      onPointerOver={e => handleHoverIn()}
      onPointerOut={e => setHover(false)}
    >
      <icosahedronBufferGeometry args={[1]} attach={"geometry"} />
      <meshStandardMaterial
        color={hovered ? hoverColor : color}
        attach={"material"}
      />
    </mesh>
  )
}

export default Icosahedron
