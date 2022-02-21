import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <div className="m-0 flex justify-center items-center w-screen h-screen p-4 z-20">
        { children }
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
