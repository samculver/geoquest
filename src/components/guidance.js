import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import DirectionArrow from "./directionArrow"
import LocationContext from "../context/locationContext"

import Div100vh from "react-div-100vh"
import GoogleMapReact from "google-map-react"
import { TiMap, TiCompass, TiTimes, TiUser } from "react-icons/ti"
import { GiTreasureMap } from "react-icons/gi"

class Guidance extends React.Component {
  static contextType = LocationContext

  state = {
    mapZoom: 18,
    showMap: false,
    arrived: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { arrived } = this.state
    const { onArrive } = this.props
    if (!arrived) {
      this.checkIfArrived()
    }
    if (arrived && !prevState.arrived) {
      // trigger callback function when arrived
      if (onArrive) {
        onArrive()
      }
    }
    this.checkIfNewTarget(prevProps)
  }

  render() {
    const { mapZoom, showMap } = this.state
    const { latitude, longitude, accuracy } = this.context
    const { targetLatitude, targetLongitude } = this.props
    return (
      <>
        <div className={styles.commandBar}>
          <div className={styles.navModes}>
            <GiTreasureMap
              className={styles.logoNav}
              onClick={() => navigate("/")}
            />
            <TiCompass
              className={!showMap ? styles.active : ""}
              onClick={() => this.toggleMap(false)}
            />
            <TiMap
              className={showMap ? styles.active : ""}
              onClick={() => this.toggleMap(true)}
            />
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
                targetLongitude,
                true
              )}
            </span>
          </div>
        )}
        {showMap && (
          <Div100vh className={styles.map}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyD4SADWp_Jb34U61H8mFrBimnutRBGqGLs",
              }}
              defaultCenter={{
                lat: latitude,
                lng: longitude,
              }}
              defaultZoom={mapZoom}
            >
              <TiUser
                className={styles.mapIcon}
                lat={latitude}
                lng={longitude}
              />
              <TiTimes
                className={styles.mapIcon}
                lat={targetLatitude}
                lng={targetLongitude}
              />
            </GoogleMapReact>
            <span className={styles.miniDistance}>
              {this.getDistance(
                latitude,
                longitude,
                targetLatitude,
                targetLongitude,
                true
              )}
            </span>
          </Div100vh>
        )}
      </>
    )
  }

  toggleMap = value => {
    this.setState({
      showMap: value != null ? value : !this.state.showMap,
    })
  }

  checkIfArrived = () => {
    // if arrived, then set State arrived = true
    const { latitude, longitude } = this.context
    const { targetLatitude, targetLongitude, onArrive } = this.props
    const distance = this.getDistance(
      latitude,
      longitude,
      targetLatitude,
      targetLongitude,
      false
    )
    // distance is within 2 meters from target
    if (distance <= 2 && distance > 0) {
      this.setState({ arrived: true })
    }
  }

  checkIfNewTarget = prevProps => {
    // if targetLatitude and TargetLongitude change, then set Sate 'arrived' = false
    const { targetLatitude, targetLongitude } = this.props
    const {
      targetLatitude: prevTargetLatitude,
      targetLongitude: prevTargetLongitude,
    } = prevProps
    if (
      targetLatitude !== prevTargetLatitude &&
      targetLongitude !== prevTargetLongitude
    ) {
      this.setState({
        arrived: false,
      })
    }
  }

  getDistance = (lat1, lon1, lat2, lon2, readable) => {
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
    let d = Math.round(R * c * 1000)
    if (readable) {
      if (d >= 1000) return Math.round(d / 1000) + "km"
      else if (d < 1000) return d + "m"
    }
    return d
  }
}

export default Guidance
