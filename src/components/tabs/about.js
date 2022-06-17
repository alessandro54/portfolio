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
        <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="alessandroparis" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://pe.linkedin.com/in/alessandroparis/en?trk=profile-badge">Alessandro Chumpitaz</a></div>

      </div>
    </div>
  )
}
export default About;