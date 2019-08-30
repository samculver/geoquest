import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"

const Home = () => (
  <Layout>
    <Header />
    <p>Choose a mode:</p>
    <button onClick={() => navigate("/random/")}>Random</button>
  </Layout>
)

export default Home
