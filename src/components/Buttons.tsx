import React from "react"
import Button from "./Button"

interface ButtonsProps {
  buttons: Array<string>
  onButtonClick: (type: string) => void
}

const Buttons: React.FC<ButtonsProps> = ({ buttons, onButtonClick }) => {
  return (
    <div
      className="mt-10 bg-white bg-opacity-30  flex flex-col justify-center items-center md:flex-row md:mt-20"
      style={{ backdropFilter: "blur(5px)" }}
    >
      {buttons.map((name: string, i: number) => (
        <Button key={i} type={name} handleClick={onButtonClick} />
      ))}
    </div>
  )
}

export default Buttons
