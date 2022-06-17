import React from "react";
import Button from "./Button";

const Buttons = ({ buttons, onButtonClick }) => {
  return (
    <div className="mt-10 bg-white bg-opacity-30  flex flex-col justify-center items-center md:flex-row md:mt-20"
      style={{ backdropFilter: "blur(5px)" }}
    >
      {
        buttons.map((name, i) => (
          <Button
            key={i}
            keyName={i}
            type={name}
            handleClick={onButtonClick}
          />
        ))
      }
    </div>
  );
};

export default Buttons;