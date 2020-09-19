import React from "react"
import styled from  "styled-components"
import Button from "./Button"

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
const Hero = ({mode}) => {
  return (
    <>
      <StyledCard >
        <div>
          <h1>Alessandro Chumpitaz</h1>
          <p>Full-Stack Software Developer</p>
        </div>
      </StyledCard>
      <ButtonZone>
        <Button type={'about'}/>
        <Button type={'projects'}/>
        <Button type={'test'}/>
        <Button type={'contact'}/>
      </ButtonZone>
    </>
  )
}

export default Hero