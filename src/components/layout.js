/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import Background from "./threeobjects/Background"

const Layout = ({ children }) => {

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          display:"flex",
          justifyContent:"center",
          flexDirection:"column",
          alignItems:"center",
          maxWidth: `100vw`,
          minHeight: `100vh`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <Background/>
        {children}
        <footer style={{
          position:"fixed",
          bottom:0,
          color:'black',
          zIndex:8,
          fontFamily: "font-family: 'Roboto', sans-serif",
        }}>
          © {new Date().getFullYear()}, Built in <a href="https://www.gatsbyjs.com">Gatsby</a> and Designed by alessandro
          {` `}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
