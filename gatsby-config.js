/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: "portal",
        id: "portal",
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Gochi+Hand`
          },
          {
            family: `Permanent+Marker`
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `wfuqmhbc9mh8`,
        accessToken: `q6uRvjIkXc5hnqsW2qasEVJeFio8cOxdxIB0c4NJg0A`,
      },
    },
  ],
  pathPrefix: "/location-game",
}
