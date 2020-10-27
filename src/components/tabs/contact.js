import React from "react"
import styled from "styled-components"
import { FaGithub, FaLinkedin }  from "react-icons/fa"
import {AiOutlineMail} from "react-icons/ai"
const StyledCard = styled.div`
    display: flex;
    height: 70%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    color: white;
    a:visited,a:link,a:active {
      color: white;
      text-decoration: none;
    }
    a:hover {
        color: lightblue
    }
    div p {
        display: flex;
        margin-left: 20px;
        align-items: center;
        font-size: 2.5vw;
        font-family: 'Roboto', sans-serif;
    }
    .links {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 10vw;
    }
    .email {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            margin: 0 0 0 10px ;
        }
    }
    div p:hover {
        color: lightblue;
    }
    @media only screen and (max-width: 768px) {
        .links {
            padding: 10%;
            font-size: 20vw;
        }
        div {
          margin-top: 15vw;
        }
        div p {
            font-size: 1rem;
        }
    
    }
`
const Contact = () => {
  return (
    <StyledCard>
      <h1>Contact</h1>
      <div className={"links"}>
        <a href={'https://linkedin.com/in/alessandrochumpitaz'}><FaLinkedin/> </a>
        <a href={'https://github.com/alessandro54'}><FaGithub/> </a>
      </div>
      <div className={"email"}>
        <AiOutlineMail/>
        <p> alessandro.chumpitazp@gmail.com</p>
      </div>
    </StyledCard>
  )
}

export default Contact