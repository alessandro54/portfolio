import React from "react"
import styled from "styled-components"
const StyledButton = styled.div`
    background: rgba(0,0,0,0.10);
    backdrop-filter: blur(5px);
    font-family: 'Roboto', sans-serif;
    margin: 10% 0 8px 0;
    padding: 5%;
    font-size: 1.2vw;
    font-weight: bold;
    transition: 0.1s;
    &:hover {
      transform: scale(1.1);
      transition: 0.1s;
      background: rgba(0,0,0,0.4);
    }
    a {
      color: white; 
      cursor: pointer;
    }
`
const Button = ({type,handleClick}) => {
  return(
    <StyledButton onClick = {e => handleClick(type)}>
      <a>{type.charAt(0).toUpperCase() + type.slice(1)}</a>
    </StyledButton>
  )
}

export default Button;