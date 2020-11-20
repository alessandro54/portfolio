import React from "react"
import styled from  "styled-components"
const Card = styled.div`
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    border-radius: 8px;
    height: 25%;
    margin-bottom: 20px;
    width: 80%;
    &:hover {
        cursor: pointer;
        transition: 0.8s;
        transform: scale(1.1);
    }
    .info {
        flex-direction: column;
        width: 80%;
        font-family: 'Roboto', sans-serif;        
        h1 {
            font-size: 3vw;
        }           
    }
    @media only screen 
    and (min-device-width: 768px) 
    and (max-device-width: 1024px) 
    and (-webkit-min-device-pixel-ratio: 1)
     and (orientation: portrait){
    }
    @media only screen and (max-width: 768px)
     and (orientation: portrait){
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
    @media only screen and (max-width: 768px)
     and (orientation: landscape) {
        .info {
            h1 {
                  font-size: 5vw;
                  text-align: center;
            }
            p {
                font-size: 3vw;
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
      <div className={'info'}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Card>
  )
}

export default Project