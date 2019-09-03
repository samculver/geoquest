import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import { GiTreasureMap } from "react-icons/gi"

const Home = () => (
  <Layout>
    <GiTreasureMap className={styles.logo} />
    <p className={styles.centerTopAdjust}>
      <button className={styles.button} onClick={() => navigate("/modes/")}>
        Play
      </button>
    </p>
    <p className={styles.stats}>v 0.0.9</p>
  </Layout>
)

export default Home
