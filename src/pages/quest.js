import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Guidance from "../components/guidance"
import LocationContext from "../context/locationContext"

class Quest extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null,
    quest: {
      title: 'Quest Title',
      startText: 'start text',
      endText: 'end text',
      phases: [
        {
          title: 'Phase One',
          startText: 'start text',
          endText: 'end text',
          latitude: null,
          longitude: null
        },
        {
          title: 'Phase Two',
          startText: 'start text',
          endText: 'end text',
          latitude: null,
          longitude: null
        }
      ]
    }
  }

  render() {
    const {
      targetLatitude,
      targetLongitude
    } = this.state
    return (
      <Layout>
        <Guidance targetLatitude={targetLatitude} targetLongitude={targetLongitude} />
      </Layout>
    )
  }
}

export default Quest