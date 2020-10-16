/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.sourceNodes = ({actions, createNodeId,createContentDigest }) => {
  const projects = [
    {
      id: 1,
      title: "Moviesky",
      description: "Movie Indexing Web App, featuring Auth and Custom Redux Protected Router.",
      front: ['React','Redux'],
      back: ['Express.js','MongoDB'],
      url: 'https://moviesky.vercel.app/'
    },
    {
      id: 2,
      title: "Contactable",
      description: "Simple contact indexing app.",
      front: ['React','Redux'],
      back: ['Ruby on Rails','PostgreSQL'],
      url: 'https://contactable-redux.vercel.app/contacts'
    }
  ]

  projects.forEach( project => {
    const node = {
      id: createNodeId(`Project-${project.id}`),
      title: project.title,
      description: project.description,
      front: project.front,
      back: project.back,
      url: project.url,
      internal: {
        type: "Project",
        contentDigest: createContentDigest(project),
      },
    }
    actions.createNode(node)
  })
}