import React from "react"
import styled from "styled-components"
import {FaGithub, FaLinkedin, FaPhone}  from "react-icons/fa"
import {AiOutlineMail} from "react-icons/ai"
const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    div p:hover {
        color: lightblue;
    }
    @media only screen and (max-width: 768px) {
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
      <div>
        <p><a href={'https://linkedin.com/in/alessandrochumpitaz'}><FaLinkedin/> LinkedIn</a></p>
        <p><a href={'https://github.com/alessandro54'}><FaGithub/> Github</a></p>
        <p><AiOutlineMail/> alessandro.chumpitazp@gmail.com</p>
        <p><FaPhone/> +51 977858998</p>
      </div>
    </StyledCard>
  )
}

export default Contact