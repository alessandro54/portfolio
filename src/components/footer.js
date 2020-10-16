import React from "react"
import styled from "styled-components"
const StyledFooter = styled.footer`
    position: fixed;
    bottom:0;
    color: white;
    z-index: 8;
    font-family: 'Roboto', sans-serif;
    a:visited, a:link, a:active {
        text-decoration: none;
        color: purple;
        font-weight: bold;
    }
`
const Footer = () => {

  return (
    <StyledFooter>
      <p>© {new Date().getFullYear()}, Built in <a href="https://www.gatsbyjs.com">Gatsby</a> by alessandro</p>
    </StyledFooter>
  )
}

export default Footer