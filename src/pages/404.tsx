import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
const NotFoundPage = () => (
  <Layout>
    <>
      <Seo title="404: Not found" />
      <div>
        <h1>Oops 404</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
        <a href={"/"}>
          <div>Take me back!</div>
        </a>
      </div>
    </>
  </Layout>
)

export default NotFoundPage
