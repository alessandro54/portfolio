import React from "react"

const NameCard = () => {
  const border = "border-r-2 border-l-2 md:border-l-0 md:border-r-0 md:border-t-2 md:border-b-2 border-white"
  return (
    <div className={`select-none w-50 h-30 md:h-36 p-2 ${border} flex justify-center items-center transition delay-150 hover:border-black cursor-pointer`}>
      <div className="text-white font-roboto flex flex-col md:h-full justify-center items-center bg-black bg-opacity-30 transition delay-150 hover:bg-white hover:bg-opacity-30 hover:text-black"
           style={{backdropFilter:"blur(5px)"}}>
        <h1 className="text-3xl text-center">Alessandro Paris Chumpitaz Paredes</h1>
        <p className="text-xl text-center">Software Developer</p>
      </div>
    </div>
  )
}
export default NameCard