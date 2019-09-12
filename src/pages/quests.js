import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"

const Quests = () => {

  return (
    <Layout>
      <div className={styles.centerTopAdjust}>
        <h3>Mode</h3>
        <p>
          <button
            className={styles.button}
            onClick={() => navigate("/questsList/")}
          >
            Find
          </button>
        </p>
        <p>
          <button
            disabled
            className={styles.button}
            onClick={() => navigate("/")}
          >
            Create
          </button>
        </p>
      </div>
    </Layout>
  )
}

export default Quests
