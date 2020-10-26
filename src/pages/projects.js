import React from "react"
import { useStaticQuery, graphql} from "gatsby"
import styled from "styled-components"
import Project from "../components/Project"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20%;
    @media only screen and (max-width: 768px) {
        padding: 2%;
    
    }
`
const Projects = () => {
  const {allProject} = useStaticQuery(graphql`
    query getAllProjects {
        allProject {
            nodes {
                title
                description
                front
                back
                url
            }
        }
    }
  `)
  return (
    <Wrapper>
      {allProject.nodes.map((node,i) => {
        return (
          <Project
            key = {i}
            {...node}
          />
        )
      })}
    </Wrapper>

  )

}

export default Projects