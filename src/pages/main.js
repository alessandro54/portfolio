import React, { useEffect, useState } from "react"
import styled from  "styled-components"
import Button from "../components/Button"
import Modal from "../components/Modal"

const Wrapper = styled.div`
    z-index: 4;
    section {
        display: ${props => props.show ? 'block' : 'none'};
    }
`
const StyledCard = styled.div`
    display: flex;
    width: 50vw;
    height: 30vh;
    justify-content: center;
    align-items: center;
    border-top:  2px solid white ;
    border-bottom: 2px solid white;
    font-family: 'Roboto', sans-serif;
    color:white;
    pointer-events: none;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(0,0,0,0.18);
        backdrop-filter: blur(5px);
        padding: 3% 0;
        width: 80%;
    }
    div h1 {
      font-size: 3.5rem;
      margin: 0;
    }
    div p {
      font-size: 1rem;
      margin: 0;
    }
`
const ButtonZone = styled.div`
    display: flex;
    justify-content: center;
`
const Main = () => {
  const [show,setShow] = useState(true)
  const [type,setType] = useState('')
  const handleButtonClick = (type) => {
    setShow(!show)
    setType(type)
  }
  const handleModalExit = () => {
    setShow(!show)
  }
  const handleEscPress = (e) => {
    if (e.keyCode === 27) setShow(true)
  }

  useEffect(() => {
    window.addEventListener("keydown",handleEscPress,false);
    return () => window.removeEventListener("keydown",handleEscPress,false);
  },[handleEscPress])

  const buttons = ['about','projects','contact']
  return (
    <Wrapper show = {show}>
      <section>
        <StyledCard >
          <div>
            <h1>Alessandro Chumpitaz</h1>
            <p>Full-Stack Software Developer</p>
          </div>
        </StyledCard>
        <ButtonZone>
          {buttons.map((name,i) => {
            return (
              <Button key = {i} type={name} handleClick = {handleButtonClick}/>
            )
          })}
        </ButtonZone>
      </section>
      <Modal 
        visibility={show} 
        handleClick = {handleModalExit} 
        handlePress = {handleEscPress}
        type = {type}/>
    </Wrapper>
  )
}

export default Main