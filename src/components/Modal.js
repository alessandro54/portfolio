import React from "react"
import styled from "styled-components"
import About from "../pages/about"
import Contact from "../pages/contact"
import Projects from "../pages/projects"

const StyledModal = styled.div`
    display: ${props => !props.show ? 'flex' : 'none'};
    width: 80vw;
    height: 40vw;
    background-color: rgba(0,0,0,0.4);
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    position: relative;
`
const ExitButton = styled.div`
    color: white;
    font-size: 5vw;
    position: absolute;
    top: 10%;
    right: 10%;
    z-index: 10;
    &:hover {
        cursor: pointer;
        color: lightblue;
        transition: 0.5s;
        transform: scale(1.2);
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