import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Guidance from "../components/guidance"
import LocationContext from "../context/locationContext"

class Random extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null
  }

  componentDidMount(){
    this.checkIfLocationReady();
  }

  componentDidUpdate() {
    // not sure if this is needed; would this trigger if context is sending data later?
    this.checkIfLocationReady();
  }

  render() {
    const {
      targetLatitude,
      targetLongitude
    } = this.state
    return (
      <Layout>
        <Guidance targetLatitude={targetLatitude} targetLongitude={targetLongitude} onArrive={this.onArrive} />
      </Layout>
    )
  }

  checkIfLocationReady = () => {
    const { latitude, longitude } = this.context
    let { targetLatitude, targetLongitude } = this.state
    // Get a random coordinate
    if (!targetLatitude && !targetLongitude && latitude && longitude) {
      let { targetLatitude, targetLongitude } = this.getRandomNearbyTarget(
        latitude,
        longitude
      )
      this.setState({
        targetLatitude,
        targetLongitude
      })
    }
  }

  onArrive = () => {
    alert('you have arrived!');
    // need dialog message and buttons for whats next (new location or exit)
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
}

export default Random
