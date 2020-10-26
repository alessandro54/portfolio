import React, { useEffect, useState } from "react"
import styled from  "styled-components"
import Button from "../components/Button"
import Modal from "../components/Modal"
import NameCard from "../components/NameCard"
import Buttons from "../components/Buttons"

const Wrapper = styled.div`
    z-index: 4;
    section {
        display: ${props => props.show ? 'block' : 'none'};
    }
`
const Main = () => {
  const [modalVisibility,setModalVisibility] = useState(true)
  const [selectedWindow,setSelectedWindow] = useState('')
  const handleButtonClick = (type) => {
    setModalVisibility(!modalVisibility)
    setSelectedWindow(type)
  }
  const handleModalExit = () => {
    setModalVisibility(!modalVisibility)
  }
  const handleEscPress = (e) => {
    if (e.keyCode === 27) setModalVisibility(true)
  }
  useEffect(() => {
    window.addEventListener("keydown",handleEscPress,false);
    return () => window.removeEventListener("keydown",handleEscPress,false);
  },[handleEscPress])

  return (
    <Wrapper show = {modalVisibility}>
      <section>
        <NameCard/>
        <Buttons
          buttons={['about','projects','contact']}
          onButtonClick={handleButtonClick}
        />
      </section>
      <Modal 
        visibility={modalVisibility} 
        handleClick = {handleModalExit} 
        handlePress = {handleEscPress}
        type = {selectedWindow}
      />
    </Wrapper>
  )
}

export default Main