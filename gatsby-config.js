module.exports = {
  siteMetadata: {
    title: `Alessandro Chumpitaz`,
    description: `Alessandro Chumpitaz Portfolio`,
    author: `@alessandro`,
    github: `https://github.com/alessandro54`,
    linkedin: `https://www.linkedin.com/in/alessandrochumpitaz/`,
    contactMail: `alessandrochumpitazp@gmail.com`,
    currentHour: new Date().getHours()
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    'react-three-fiber',
    'gatsby-plugin-styled-components',
    'drei',
    "react-icons"
    // this (optional) plugin enables Progressive Web Background + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
