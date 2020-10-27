import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const Title = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 50;
`
const Button = styled.button`
      color: white;
      background-color: rgba(0,0,0,0.3);
      backdrop-filter: blur(8px);
      border: none;
      font-size: 4vw;
      height: 7vh;
`
const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Title>
      <h1>Oops 404</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
      <a href={"/"}><Button>Take me back!</Button></a>
    </Title>
  </Layout>
)

export default NotFoundPage
