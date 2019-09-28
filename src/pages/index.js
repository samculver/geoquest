import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import { GiTreasureMap } from "react-icons/gi"

const Home = () => {
  // reset any game data
  typeof window !== "undefined" && window.localStorage.clear()

  return (
    <Layout>
      
      <h1 className={styles.title}>Quest<span className={styles.titleEnd}>Hunter</span></h1>
      <GiTreasureMap className={styles.logo} />
      <p className={styles.centerTopAdjust}>
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
      </p>
    </Layout>
  )
}

export default Home
