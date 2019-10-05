import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"

const Profile = () => {

  return (
    <Layout>
      <div className={styles.centerTopAdjust}>
        <h2>My Created Quests</h2>
        <p>You have not created any quests yet.</p>
        <p>Sounds like fun?</p>
        <button className={styles.button} disabled>
          Create a Quest
        </button>
      </div>
    </Layout>
  )
}

export default Profile
