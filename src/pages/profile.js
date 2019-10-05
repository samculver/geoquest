import React, { useContext } from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import UserContext from "../context/userContext"

const Profile = () => {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <div className={styles.centerTopAdjust}>
        <h2>Your Name</h2>
        <h3>Adventurer</h3>
        {userContext.picture && (
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${userContext.picture.data.url})` }}
          />
        )}
        <h3>Recently completed quests:</h3>
        <p>None</p>
        <p>Looks like a good time to start exploring!</p>
      </div>
    </Layout>
  )
}

export default Profile
