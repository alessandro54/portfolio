import React, { useCallback, useEffect, useState } from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import NameCard from "../components/NameCard"
import Buttons from "../components/Buttons"
import Modal from "../components/Modal"
import Background from "../threeobjects/Background"
import Social from "../components/Social"

const IndexPage = () => {

  const [modalVisibility,setModalVisibility] = useState(false);
  const [selectedWindow,setSelectedWindow] = useState('');

  const handleButtonClick = (type) => {
    if (type === 'experience') window.location.href = "/experience"
    else if (type === 'blog') window.location.href = "https://blog.alessandroparis.dev"
    else {
      setModalVisibility(!modalVisibility)
      setSelectedWindow(type)
    }
  };

  const handleModalExit = () => {
    setModalVisibility(!modalVisibility)
  };

  const handleEscPress = useCallback((e) => {
    if (e.keyCode === 27) setModalVisibility(false)
  },[]);

  useEffect(() => {
    window.addEventListener("keydown",handleEscPress,false);
    return () => window.removeEventListener("keydown",handleEscPress,false);
  },[handleEscPress]);

  return (
    <Layout>
      <SEO title="Home"/>
      <Background/>
      <Social/>
      <div className="z-10">
        <section className={!modalVisibility ? 'block' : 'hidden'}>
          <NameCard/>
          <Buttons
            buttons={['about','experience', 'blog', 'contact']}
            onButtonClick={handleButtonClick}
          />
        </section>
        <Modal
          visibility={modalVisibility}
          handleClick = {handleModalExit}
          handlePress = {handleEscPress}
          type = {selectedWindow}
        />
      </div>
    </Layout>
  )
};


export default IndexPage;
