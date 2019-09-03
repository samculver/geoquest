import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import DirectionArrow from "./directionArrow"
import LocationContext from "../context/locationContext"

import Div100vh from "react-div-100vh"
import GoogleMapReact from "google-map-react"
import {
  TiMap,
  TiCompass,
  TiTimes,
  TiUser
} from "react-icons/ti"
import { GiTreasureMap } from "react-icons/gi"

class Guidance extends React.Component {
  static contextType = LocationContext

  state = {
    mapZoom: 18,
    showMap: false
  }

  render() {
    const {
      mapZoom,
      showMap,
    } = this.state
    const { latitude, longitude, accuracy } = this.context
    const { targetLatitude, targetLongitude } = this.props;
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
                targetLongitude
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
                lng: longitude
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
                targetLongitude
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

export default Guidance
