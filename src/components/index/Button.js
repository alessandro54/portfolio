import React from "react"
import {Link} from "gatsby"
import styled from "styled-components"
const StyledButton = styled.div`
    background: rgba(0,0,0,0.10);
    backdrop-filter: blur(5px);
    font-family: 'Roboto', sans-serif;
    margin: 10% 0 8px 0;
    padding: 5%;
    font-size: 1.2vw;
    font-weight: bold;
    a:visited,a:active,a:link {
        text-decoration: none;
        color:white;
    }
`
const Button = ({type}) => {
  return(
    <StyledButton>
      <Link to = {`/${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</Link>
    </StyledButton>
  )
}

export default Button;