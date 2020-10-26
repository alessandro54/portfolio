import React from "react"
import styled from  "styled-components"
const Card = styled.div`
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    border-radius: 8px;
    height: 20vh;
    margin-bottom: 20px;
    &:hover {
        cursor: pointer;
        transition: 0.8s;
        transform: scale(1.1);
    }
    .photo {
        width: 40%;
        background: white;
    }
    .info {
        flex-direction: column;
        width: 60%;
        font-family: 'Roboto', sans-serif                           
    }
    @media only screen and (max-width: 768px) {
        .info {
            h1 {
                  font-size: 7vw;
                  text-align: center;
            }
            p {
                font-size: 5vw;
            }
        }
    }
`
const Project = ({title,description,back,front,url}) => {
  const handleClick = () => {
    window.open(url,'_blank')
  }
  return (
    <Card onClick = {handleClick}>
      <div className={'photo'}>

      </div>
      <div className={'info'}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Card>
  )
}

export default Project