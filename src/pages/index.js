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
  const userContext = useContext(UserContext)

  const responseFacebook = response => {
    alert(response)
    if (response.name) {
      userContext.setUser(response)
    }
  }

  return (
    <Layout>
      <h1 className={styles.title}>
        Quest<span className={styles.titleEnd}>Hunter</span>
      </h1>
      <GiTreasureMap className={styles.logo} />
      <div className={styles.centerTopAdjust}>
        {!userContext.loggedIn && (
          <div>
            <p>
              <FacebookLogin
                appId="686273005195758"
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass={styles.facebookButton}
                icon={<TiSocialFacebookCircular />}
              />
            </p>
            <p>
              <button
                className={styles.button}
                onClick={() =>
                  userContext.setUser({
                    name: "anonymous",
                    id: null,
                    picture: null,
                  })
                }
              >
                Skip
              </button>
            </p>
          </div>
        )}
        {userContext.loggedIn && (
          <>
            <p>
              <button
                className={styles.button}
                onClick={() => navigate("/map")}
              >
                Play
              </button>
            </p>
            <p>
              <button className={styles.button} disabled>
                Create
              </button>
            </p>
            <p>
              <button
                className={styles.button}
                onClick={() => navigate("/modes/")}
              >
                Test
              </button>
            </p>
            <span className={styles.logout} onClick={userContext.logout}>Log out</span>
          </>
        )}
      </div>
      
    </Layout>
  )
}

export default Home
