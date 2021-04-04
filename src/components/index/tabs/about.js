import React from "react"

const About = () => {
  const calculateAge = () => {
    let diff = Date.now() - new Date(1998,4,21).getTime()
    let ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear()- 1970)
  }
  return (
    <div>
      <div>
        <h2>Hi!, I'm Alessandro.</h2>
        <p>I'm a {calculateAge()} years old Peruvian 🇵🇪 Full-Stack Software Web Developer</p>
      </div>
    </div>
  )
}

export default About