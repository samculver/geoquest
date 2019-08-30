import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import DirectionArrow from "../components/directionArrow"
import LocationContext from "../context/locationContext"

class Random extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null,
  }

  componentDidUpdate() {
    const { latitude, longitude } = this.context
    let { targetLatitude, targetLongitude } = this.state
    if (!targetLatitude && !targetLongitude && latitude != "null") {
      let { targetLatitude, targetLongitude } = this.getRandomNearbyTarget(
        latitude,
        longitude
      )
      this.setState({
        targetLatitude,
        targetLongitude,
      })
    }
  }

  render() {
    const { targetLatitude, targetLongitude } = this.state
    const { latitude, longitude, accuracy } = this.context
    return (
      <Layout>
         <DirectionArrow coordinates={{latitude, longitude, targetLatitude, targetLongitude}}/>
        <span className={styles.distance}>
          {this.getDistance(
            latitude,
            longitude,
            targetLatitude,
            targetLongitude
          )}
        </span>
        <p>Accuracy: {accuracy}m</p>
      </Layout>
    )
  }

  getRandomNearbyTarget = (original_lat, original_lng) => {
    const r = 100 / 111300, // = 100 meters
      y0 = original_lat,
      x0 = original_lng,
      u = Math.random(),
      v = Math.random(),
      w = r * Math.sqrt(u),
      t = 2 * Math.PI * v,
      x = w * Math.cos(t),
      y1 = w * Math.sin(t),
      x1 = x / Math.cos(y0)

    const newY = y0 + y1,
      newX = x0 + x1

    return {
      targetLatitude: newY,
      targetLongitude: newX,
    }
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    if (d > 1) return Math.round(d) + "km"
    else if (d <= 1) return Math.round(d * 1000) + "m"
    return d
  }
}

export default Random
