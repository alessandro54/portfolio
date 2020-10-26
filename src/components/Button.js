import React from "react"
import styled from "styled-components"
const StyledButton = styled.div`
    background: rgba(0,0,0,0.3);
    font-family: 'Roboto', sans-serif;
    padding: 5%;
    font-size: 1.7vw;
    font-weight: bold;
    transition: 0.1s;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.15);
      transition: 0.2s;
      background: rgba(0,0,0,0.8);
      z-index: 10;
      cursor: pointer;
      backdrop-filter: blur(5px);
    }
    p {
      color: white; 
      cursor: pointer;
      margin: 0;
    }
    
    @media only screen 
    and (min-device-width: 768px) 
    and (max-device-width: 1024px) 
    and (-webkit-min-device-pixel-ratio: 1) {
        font-size: 5vw;
        width: 400px;
    }
    @media only screen and (max-width: 768px) {
    width: 70vw ;
        font-size: 2.5rem;
        padding: 7% 0;
        p {
          text-align: center;
        }
    }
`
const Button = ({type,handleClick}) => {
  return(
    <StyledButton onClick = {e => handleClick(type)}>
      <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
    </StyledButton>
  )
}

export default Button;