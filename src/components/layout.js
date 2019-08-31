import React from "react"
import styles from "../styles.module.scss"
import Div100vh from "react-div-100vh"

export default ({ children }) => (
  <Div100vh className={styles.flexCenter}>
    <div className={styles.app}>{children}</div>
  </Div100vh>
)
