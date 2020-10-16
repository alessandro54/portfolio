import React from "react"
import Main from "./main"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <Main/>
  </Layout>
)

export default IndexPage
