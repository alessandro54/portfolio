import React from "react";

const Button = ({type,handleClick}) => {
  return(
    <div className="select-none bg-black bg-opacity-30 p-2 md:py-4 w-40 md:w-32 hover:bg-opacity-80 transition delay-150 cursor-pointer"
         style={{backdropFilter:"blur(5px)"}}
         onClick = {e => handleClick(type)}>
      <p className="text-white text-2xl md:text-xl text-roboto text-center">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
    </div>
  )
};

export default Button;