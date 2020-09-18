import React from "react"
import { Link } from "gatsby"
import styled from  "styled-components"

const StyledCard = styled.div`
    display: flex;
    width: 50vw;
    height: 30vh;
    justify-content: center;
    align-items: center;
    border-top: 2px solid ${props => props.lightmode ? 'white' : 'black'};
    border-bottom: 2px solid ${props => props.lightmode ? 'white' : 'black'};
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255,255,255,0.18);
        backdrop-filter: blur(5px);
        width: 80%;
    }
    div h1 {
      font-size: 3.5rem;
    }
    div p {
      font-size: 1rem;
    }
`
const Card = ({mode}) => {
  return (
    <StyledCard >
      <div>
        <h1>Alessandro</h1>
        <p>Full-Stack Software Developer</p>
      </div>
      {/*<Link to="/page-2/">Go to page 2</Link> <br />*/}
    </StyledCard>
  )
}

export default Card