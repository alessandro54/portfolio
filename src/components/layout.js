/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Background from "./Background"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

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
          marginTop: `2rem`
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
