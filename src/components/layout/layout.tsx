import React from "react"

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <div className="m-0 flex justify-center items-center w-screen h-screen p-4 z-20">
        {children}
      </div>
    </>
  )
}

export default Layout
