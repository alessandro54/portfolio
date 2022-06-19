import React from "react"

const About = () => {
  const calculateAge = () => {
    let birthday = +new Date("1998-04-21")
    return ~~((Date.now() - birthday) / 31557600000)
  }
  return (
    <div>
      <h1>About me</h1>
    </div>
  )
}
export default About
