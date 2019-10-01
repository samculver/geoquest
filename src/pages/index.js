import React, { useContext } from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import UserContext from "../context/userContext"
import FacebookLogin from "react-facebook-login"
import { GiTreasureMap } from "react-icons/gi"
import { TiSocialFacebookCircular } from "react-icons/ti"

const Home = () => {
  // reset any game data
  typeof window !== "undefined" && window.localStorage.clear()

  const userContext = useContext(UserContext)

  const responseFacebook = response => {
    alert("login success!")
    console.log(response)
    console.log(userContext)
    if (response.name) {
      userContext.setUser(response)
    }
    console.log(userContext)
  }

  return (
    <Layout>
      <h1 className={styles.title}>
        Quest<span className={styles.titleEnd}>Hunter</span>
      </h1>
      <GiTreasureMap className={styles.logo} />
      <div className={styles.centerTopAdjust}>
        <p>
          <FacebookLogin
            appId="686273005195758"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass={styles.facebookButton}
            icon={<TiSocialFacebookCircular />}
          />
        </p>
        <p>
          <button className={styles.button} onClick={() => navigate("/start/")}>
            Skip
          </button>
        </p>
      </div>
    </Layout>
  )
}

export default Home
