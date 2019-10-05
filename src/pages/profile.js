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
        <h2>My Profile</h2>
        {userContext.picture && (
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${userContext.picture.data.url})` }}
          />
        )}
        <p>Title: Adventurer</p>
        <p>Completed Quests: 0</p>
      </div>
    </Layout>
  )
}

export default Profile
