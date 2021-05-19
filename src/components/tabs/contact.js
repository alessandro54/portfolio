import React from "react"
import { FaGithub, FaLinkedin }  from "react-icons/fa"
import {AiOutlineMail} from "react-icons/ai"

const Contact = () => {
  return (
    <dvi>
      <h1>Contact</h1>
      <div className={"links"}>
        <a href={'https://linkedin.com/in/alessandrochumpitaz'}><FaLinkedin/> </a>
        <a href={'https://github.com/alessandro54'}><FaGithub/> </a>
      </div>
      <div className={"email"}>
        <AiOutlineMail/>
        <p> alessandro.chumpitazp@gmail.com</p>
      </div>
    </dvi>
  )
}

export default Contact