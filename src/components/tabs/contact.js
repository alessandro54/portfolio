import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const Contact = () => {
  return (
    <div>
      <div>
        <div className={"email flex"}>
          <h1 className={"mr-1"}>Contact</h1><AiOutlineMail />
        </div>
        <a href="mailto:alessandrochumpitaz@icloud.com">
          Lets be in contact!
        </a>
      </div>
    </div>
  )
}

export default Contact;