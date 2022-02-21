import React from "react";

const About = () => {
  const calculateAge = () => {
    let birthday = +new Date('1998-04-21');
    return ~~((Date.now() - birthday) / (31557600000));
  }
  return (
    <div>
      <h1>About me</h1>
      <div>
        <h2>Hi!, I'm Alessandro.</h2>
        <p>I'm a {calculateAge()} years old Peruvian 🇵🇪 Full-Stack Software Web Developer</p>
      </div>
    </div>
  )
}
export default About;