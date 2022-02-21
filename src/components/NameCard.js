import React from "react";

const NameCard = () => {
  const border = "border-r-2 border-l-2 md:border-l-0 md:border-r-0 md:border-t-2 md:border-b-2 border-white"
  return (
    <div className={`w-50 h-30 md:h-36 p-2 ${border} flex justify-center items-center transition delay-150 hover:border-yellow
      cursor-pointer text-white select-none`}
    >
      <div className="w-full font-roboto flex flex-col md:h-full justify-center items-center bg-white bg-opacity-30"
            style={{backdropFilter:"blur(px)"}}
      >
        <h1 className="text-3xl text-center">Alessandro Paris Chumpitaz </h1>
        <p className="text-xl text-center">Software Engineer</p>
      </div>
    </div>
  )
}
export default NameCard;