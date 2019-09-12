import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import { GiTreasureMap } from "react-icons/gi"

const Modes = () => {
  // reset any game data
  typeof window !== 'undefined' && window.localStorage.clear()

  return (
    <Layout>
      <div className={styles.centerTopAdjust}>
        <h3>Mode</h3>
        <p>
          <button
            className={styles.button}
            onClick={() => navigate("/random/")}
          >
            Random
          </button>
        </p>
        <p>
          <button
            className={styles.button}
            onClick={() => navigate("/time-trial/")}
          >
            Time Trial
          </button>
        </p>
        <p>
          <button
            className={styles.button}
            onClick={() => navigate("/quests/")}
          >
            Quest
          </button>
        </p>
      </div>
    </Layout>
  )
}

export default Modes
