import React, { useContext, useState } from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import UserContext from "../context/userContext"

const UserMenu = () => {
  const userContext = useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.userMenu}>
      {userContext.picture && (
        <div
          className={styles.avatar}
          onClick={()=>{setMenuOpen(!menuOpen)}}
          style={{ backgroundImage: `url(${userContext.picture.data.url})` }}
        />
      )}
      {menuOpen && (
        <ul>
          <li onClick={() => navigate("/Profile/")}>Profile</li>
          <li onClick={() => navigate("/MyQuests/")}>My Quests</li>
          <li onClick={() => navigate("/UserSettings/")}>Settings</li>
        </ul>
      )}
    </div>
  )
}

export default UserMenu
