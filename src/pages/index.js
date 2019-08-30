import React from "react"
import { navigate, Link } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"

const Home = () => (
  <Layout>
    <button onClick={() => navigate("/random/")}>Find a target</button>
    <p>v 0.0.2</p>
  </Layout>
)

export default Home
