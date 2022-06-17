import React from "react";
import About from "./tabs/about";
import Contact from "./tabs/contact";

const Modal = ({ type, visibility, handleClick }) => {
  const content = (type) => {
    switch (type) {
      case 'about': return <About />;
      case 'contact': return <Contact />
      default: return <h1>Not found!</h1>
    }
  }
  return (
    <section
      role="row"
      tabIndex={0}
      className={`${visibility ? "flex" : "hidden"} w-screen h-screen justify-center items-center text-white transition-all`}
      onClick={(e) => { e.preventDefault() }}
    >
      <div className="w-11/12 lg:w-3/5 h-3/5 p-5 flex flex-col justify-center items-center bg-black
          bg-opacity-50 rounded"
        style={{ backdropFilter: "blur(10px" }}
      >
        <div className="w-full h-1/6 flex justify-end items-center">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handleClick(e)}
            className="text-4xl lg:text-7xl hover:text-black transition-all cursor-pointer"
          >
            &times;
          </span>
        </div>
        <div className="w-full h-5/6">
          {content(type)}
        </div>
      </div>
    </section>
  )
}

export default Modal;