import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"

const UserSettings = () => {

  return (
    <Layout>
      <div className={styles.centerTopAdjust}>
        <h2>Settings</h2>
        <p>
          <button className={styles.button} disabled>
            Delete Account
          </button>
        </p>
      </div>
    </Layout>
  )
}

export default UserSettings
