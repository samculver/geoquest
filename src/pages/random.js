import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import LocationContext from "../context/locationContext"

const Random = () => {
  const { latitude, longitude } = useContext(LocationContext)

  return (
    <Layout>
      <Header />
      Latitide: {latitude}<br />
      longitude: {longitude}
    </Layout>
  )
}

export default Random
