import React from "react"
import styled from "styled-components"
import Button from "./Button"

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vw;
    @media only screen and (min-device-width: 768px)
     and (max-device-width: 1024px)
      and (-webkit-min-device-pixel-ratio: 1)
       and (orientation: portrait){
        flex-direction: column;
        height: 30vh;
    }
    @media only screen and (min-device-width: 768px)
     and (max-device-width: 1024px)
      and (-webkit-min-device-pixel-ratio: 1)
       and (orientation: landscape){
        flex-direction: row;
        height: 30vh;
    }
    @media only screen and (max-width: 768px)
      and (orientation: portrait) {
        margin-top:15vw;
        flex-direction: column;
    }
    @media only screen and (max-width: 768px)
     and (orientation: landscape) {
        flex-direction: row;
    } 
`
const Buttons = ( {buttons , onButtonClick} ) => {
  return (
    <Wrapper>
      {buttons.map((name,i) => {
        return <Button
          key = {i}
          type={name}
          handleClick = {onButtonClick}
        />
      })}
    </Wrapper>
  )
}

export default Buttons