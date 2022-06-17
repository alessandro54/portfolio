import React from "react";

const Button = ({ type, handleClick }) => {
  return (
    <div role="button" tabIndex={0} className="select-none p-2 m-1 md:py-4 w-40 md:w-32 hover:bg-white hover:bg-opacity-30 transition delay-150 cursor-pointer"
      onClick={e => handleClick(type)}>
      <p className="text-white text-2xl md:text-xl text-roboto text-center">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
    </div>
  )
};

export default Button;