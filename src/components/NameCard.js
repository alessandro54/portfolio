import React from "react"
import styled from "styled-components"

const StyledNameCard = styled.div`
    display: flex;
    width: 50vw; height: 32vh;
    justify-content: center; align-items: center;
    border-top:  2px solid white ; border-bottom: 2px solid white;
    font-family: 'Roboto', sans-serif;
    color:white;
    pointer-events: none;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(5px);
        padding: 3% 0;
        width: 90%;
        height: 70%;
    }
    div h1 {
      font-size: 3.5vw;
      margin: 0;
      text-align: center;
    }
    div p {
      font-size: 1.5rem;
      margin: 0;
    }

    /* Portrait Tablet */
    @media only screen 
    and (min-device-width: 768px)
     and (max-device-width: 1024px)
       and (-webkit-min-device-pixel-ratio: 1) {
          width: 80vw; height: 20vh;
          padding: 0 5vw 0 5vw;
          border-top: none; border-bottom: none;
          border-left:  4px solid white; border-right: 4px solid white;
          div {
            width: 100%; height: 85%;
          }
          div h1 {
               font-size: 3.5vw;
          }
          div p {
               margin-top: 20px;
               font-size: 1.75rem;
          }
    }
    @media only screen and (max-width: 768px) {
        width: 95vw;
        div {
          width: 90%;
        }
        div h1 {
          font-size: 2rem;
          text-align: center;
        }
        div p {
          margin-top: 5vh;
          text-align: center;
        }
    }
`
const NameCard = () => {
  return (
    <StyledNameCard>
      <div>
        <h1>Alessandro Chumpitaz</h1>
        <p>Full-Stack Software Developer</p>
      </div>
    </StyledNameCard>
  )
}
export default NameCard