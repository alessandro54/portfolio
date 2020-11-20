import React from "react"
import styled from "styled-components"
import About from "./tabs/about"
import Contact from "./tabs/contact"
import Projects from "./tabs/projects"

const StyledModal = styled.div`
    display: ${props => !props.show ? 'flex' : 'none'};
    width: 80vw;
    height: 40vw;
    background-color: rgba(0,0,0,0.6);
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    position: relative;
    @media only screen 
    and (min-device-width: 768px) 
    and (max-device-width: 1024px) 
    and (-webkit-min-device-pixel-ratio: 1) {
        height: 80vh;
    }
    @media only screen and (max-width: 768px) {
        height: 80vh;
    
    }
`
const ExitButton = styled.div`
    color: white;
    font-size: 5vw;
    position: absolute;
    top: 5%;
    right: 10%;
    z-index: 10;
    height: auto;
    &:hover {
        cursor: pointer;
        color: lightblue;
        transition: 0.5s;
        transform: scale(1.2);
    }
    @media only screen and (max-width: 768px) {
        font-size: 4rem;
    }
`
const Modal = ({type,visibility,handleClick}) => {

  const renderSwitch = (type) => {
    switch (type) {
      case 'about':
        return <About/>;
      case 'projects':
        return <Projects/>;
      case 'contact':
        return <Contact/>
      default :
        return <h1>Not found!</h1>
    }
  }
  return (
    <StyledModal show = {visibility} >
      <ExitButton onClick = {e => handleClick()}>
        &times;
      </ExitButton>
      {renderSwitch(type)}
    </StyledModal>
  )
}

export default Modal