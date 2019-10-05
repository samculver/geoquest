import React, { useContext } from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import UserContext from "../context/userContext"

const UserMenu = () => {
  const userContext = useContext(UserContext)

  return (
    <div className={styles.userMenu}>
      {userContext.picture && (
        <div>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${userContext.picture.data.url})` }}
          />
          <ul>
            <li onClick={() => navigate("/Profile/")}>Profile</li>
            <li onClick={() => navigate("/MyQuests/")}>My Quests</li>
            <li onClick={() => navigate("/UserSettings/")}>Settings</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserMenu
