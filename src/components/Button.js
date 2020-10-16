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
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.1);
      transition: 0.1s;
      background: rgba(0,0,0,0.4);
    }
    p {
      color: white; 
      cursor: pointer;
      margin: 0;
    }
    @media only screen and (max-width: 768px) {
        font-size: 2.5rem;
        padding: 7% 0;
        margin: 1vw;
        p {
          text-align: center;
        }
        border-radius: 8px;
        border: 1px solid white;
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