import React from "react"
import styled from "styled-components"
const AboutCard = styled.div`
    color: white;
    font-size: 2vw;
    font-family: 'Roboto', sans-serif;
    display: flex;
    @media only screen and (max-width: 768px) {
        justify-content: center;
        h2 {
            font-size: 3rem; 
            text-align: center;
        }
        p {
            text-align: center;
            margin-top: 10%;
            font-size: 1rem;
            line-height: 30px;
        }
    }
`
const About = () => {
  const calculateAge = () => {
    let diff = Date.now() - new Date(1998,4,21).getTime()
    let ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear()- 1970)
  }
  return (
    <AboutCard>
      <div>
        <h2>Hi!, I'm Alessandro.</h2>
        <p>I'm a {calculateAge()} years old Peruvian 🇵🇪 Full-Stack Software Web Developer</p>
      </div>
    </AboutCard>
  )
}

export default About