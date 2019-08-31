import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import DirectionArrow from "../components/directionArrow"
import LocationContext from "../context/locationContext"

import GoogleMapReact from "google-map-react"
import { TiMap, TiCompass, TiTimes, TiUser, TiLocationArrow } from "react-icons/ti"
import { GiTreasureMap } from "react-icons/gi"

const MapMarker = ({ text }) => <div>{text}</div>

class Random extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null,
    mapCenter: {
      lat: null,
      lng: null,
    },
    mapZoom: 18,
    showMap: false,
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
        mapCenter: {
          lat: latitude,
          lng: longitude,
        },
      })
    }
  }

  render() {
    const {
      targetLatitude,
      targetLongitude,
      mapCenter,
      mapZoom,
      showMap,
    } = this.state
    const { latitude, longitude, accuracy } = this.context
    return (
      <Layout>
        <div className={styles.commandBar}>
          <div className={styles.navModes}>
            <GiTreasureMap className={styles.logoNav}onClick={() => navigate("/")} />
            <TiCompass className={!showMap ? styles.active : ''} onClick={() => this.toggleMap(false)} />
            <TiMap className={showMap ? styles.active : ''} onClick={() => this.toggleMap(true)} />
          </div>
        </div>
        {!showMap && (
          <div>
            <DirectionArrow
              coordinates={{
                latitude,
                longitude,
                targetLatitude,
                targetLongitude,
              }}
              accuracy={accuracy}
            />
            <span className={styles.distance}>
              {this.getDistance(
                latitude,
                longitude,
                targetLatitude,
                targetLongitude
              )}
            </span>
          </div>
        )}
        {showMap && (
          <div className={styles.map}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyD4SADWp_Jb34U61H8mFrBimnutRBGqGLs",
              }}
              defaultCenter={mapCenter}
              defaultZoom={mapZoom}
            >
              <TiUser className={styles.mapIcon} lat={latitude} lng={longitude} />
              <TiTimes className={styles.mapIcon} lat={targetLatitude} lng={targetLongitude} />
            </GoogleMapReact>
            <span className={styles.miniDistance}>
              {this.getDistance(
                latitude,
                longitude,
                targetLatitude,
                targetLongitude
              )}
            </span>
          </div>
        )}
      </Layout>
    )
  }

  toggleMap = value => {
    this.setState({
      showMap: value != null ? value : !this.state.showMap,
    })
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
