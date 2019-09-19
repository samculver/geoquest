import React from "react"
import { navigate, graphql } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  query MyQuery {
    allContentfulQuest(limit: 10) {
      edges {
        node {
          id
          title
          description {
            description
          }
        }
      }
    }
  }
`

const QuestsList = props => {
  const questEdges = props.data.allContentfulQuest.edges
  return (
    <Layout>
      <h2>Quests in your area</h2>
      {questEdges.length && (
        <ul className={styles.questsList}>
          {questEdges.map((questEdge, key) => {
            const quest = questEdge.node
            return (<li key={key}>{quest.title}</li>)
          })}
        </ul>
      )}
      {!questEdges.length && <p>Currently there are no quests in your area.</p>}
    </Layout>
  )
}

export default QuestsList
