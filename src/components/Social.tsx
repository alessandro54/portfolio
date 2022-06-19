import React from "react"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"

interface IconProps {
  url: string
  icon: React.ReactElement
}
const Icon: React.FC<IconProps> = ({ url, icon }) => (
  <a className="hover:text-rose-400 cursor-pointer mx-1" href={url}>
    {icon}
  </a>
)

const Social = () => {
  const items = [
    { url: "https://linkedin.com/in/alessandroparis", icon: <FaLinkedin /> },
    { url: "https://github.com/alessandro54", icon: <FaGithub /> },
    { url: "https://www.instagram.com/_alessandro54/", icon: <FaInstagram /> },
  ]
  return (
    <div className="w-full fixed bottom-0 text-white z-10 hidden lg:flex lg:justify-end p-10 text-2xl">
      {items.map((item, i) => (
        <Icon key={i} {...item} />
      ))}
    </div>
  )
}

export default Social
