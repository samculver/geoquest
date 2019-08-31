import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import { GiTreasureMap } from "react-icons/gi"

const Home = () => (
  <Layout>
    <GiTreasureMap className={styles.logo} />
    <p className={styles.gameModeMenu}>
      <button className={styles.button} onClick={() => navigate("/random/")}>
        Play
      </button>
    </p>
    <p className={styles.stats}>v 0.0.6</p>
  </Layout>
)

export default Home
