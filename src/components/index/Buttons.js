import React from "react";
import Button from "./Button";

const Buttons = ( {buttons , onButtonClick} ) => {
  return (
    <div className="mt-10 flex flex-col justify-center items-center md:flex-row md: mt-20">
      {
        buttons.map((name,i) => (
          <Button
            key = {i}
            type={name}
            handleClick = {onButtonClick}
          />
        ))
      }
    </div>
  );
};

export default Buttons;