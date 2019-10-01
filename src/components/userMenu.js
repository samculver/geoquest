import React, { useContext } from "react"
import styles from "../styles.module.scss"
import UserContext from "../context/userContext"

const UserMenu = () => {
  const userContext = useContext(UserContext)

  return (
    <div className={styles.userMenu}>
      {userContext.picture && (
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${userContext.picture.data.url})` }}
        />
      )}
    </div>
  )
}

export default UserMenu
