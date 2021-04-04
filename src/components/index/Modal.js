import React from "react"
import About from "./tabs/about"
import Contact from "./tabs/contact"

const Modal = ({type,visibility,handleClick}) => {

  const renderSwitch = (type) => {
    switch (type) {
      case 'about':
        return <About/>;
      case 'experience':
        return null;
      case 'contact':
        return <Contact/>
      default :
        return <h1>Not found!</h1>
    }
  }
  return (
    <div className={visibility ? "flex" : "hidden"}>
      <div onClick = {e => handleClick()}>
        &times;
      </div>
      {renderSwitch(type)}
    </div>
  )
}

export default Modal