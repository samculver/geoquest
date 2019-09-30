import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import { GiTreasureMap } from "react-icons/gi"

const Start = () => {
  // reset any game data
  typeof window !== "undefined" && window.localStorage.clear()

  const responseFacebook = response => {
    console.log(response)
  }

  return (
    <Layout>
      <p>
        <button className={styles.button} onClick={() => navigate("/map")}>
          Play
        </button>
      </p>
      <p>
        <button className={styles.button} disabled>
          Create
        </button>
      </p>
      <p>
        <button className={styles.button} onClick={() => navigate("/modes/")}>
          Test
        </button>
      </p>
    </Layout>
  )
}

export default Start
