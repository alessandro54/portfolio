import React from "react"
import styled from "styled-components"
const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    a:visited,a:link,a:active {
      color: white;
      text-decoration: none;
    }
`
const Contact = () => {
  const items = {
    LinkedIn : ['fab fa-linkedin','https://linkedin.com/in/alessandrochumpitaz'],
    GitHub : ['fab fa-github','https://github.com/alessandro54'],
    Email: ['far fa-envelope','alessandro.chumpitazp@gmail.com'],
    Phone : ['fas fa-phone','+51 977858998']
  }
  return (
    <StyledCard>
      <h1>Contact me:</h1>
      {Object.entries(items).map((item,i) => {
        return (
          <div key = {i}>
            {item[1][1].includes('https') ?
              (
                <h1><a href={item[1][1]}><i className = {item[1][0]}/> {item[0]}</a></h1>
              ) : (
                <h1><i className = {item[1][0]}/> {item[1][1]}</h1>
              )}
          </div>
        )
      })}
    </StyledCard>
  )
}

export default Contact