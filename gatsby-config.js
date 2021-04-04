module.exports = {
  siteMetadata: {
    title: `Alessandro Chumpitaz`,
    description: `Full Stack Peruvian Software Developer`,
    author: `@alessandro`,
    github: `https://github.com/alessandro54`,
    linkedin: `https://www.linkedin.com/in/alessandrochumpitaz/`,
    contactMail: `alessandrochumpitazp@gmail.com`,
    currentHour: new Date().getHours()
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    '@react-three/fiber',
    '@react-three/drei',
    'react-icons',
    'gatsby-plugin-postcss'
    // this (optional) plugin enables Progressive Web Background + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
