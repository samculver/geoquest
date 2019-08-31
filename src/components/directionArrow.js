import React from "react"
import styles from "../styles.module.scss"
import OrientationContext from "../context/orientationContext"
import { TiArrowRight, TiLocationArrow } from "react-icons/ti"

class DirectionArrow extends React.Component {
  static contextType = OrientationContext

  state = {
    arrowDegrees: null,
  }

  render() {
    const { heading } = this.context
    const {
      latitude,
      longitude,
      targetLatitude,
      targetLongitude,
    } = this.props.coordinates

    const latRad = this.toRadians(latitude),
      lonRad = this.toRadians(longitude),
      tarLatRad = this.toRadians(targetLatitude),
      tarLonRad = this.toRadians(targetLongitude)

    const y = Math.sin(tarLonRad - lonRad) * Math.cos(tarLatRad)
    console.log(latRad)
    const x =
      Math.cos(latRad) * Math.sin(tarLatRad) -
      Math.sin(latRad) * Math.cos(tarLatRad) * Math.cos(tarLonRad - lonRad)
    const bearing = this.wrap360(this.toDegrees(Math.atan2(y, x)))

    const arrowDegrees = bearing - heading - 90

    return (
      <>
        <TiArrowRight
          className={styles.arrow}
          style={{ transform: `rotate(${arrowDegrees}deg)` }}
        />
        <p className={styles.stats}>
          <span>{`Bearing: ${bearing.toFixed([0])}`}</span>
          <span>{`Heading: ${heading}`}</span>
          <span>{`Accuracy: ${this.props.accuracy}m`}</span>
        </p>
      </>
    )
  }

  toDegrees = radians => {
    return (radians * 180) / Math.PI
  }

  toRadians = degrees => {
    return (degrees * Math.PI) / 180
  }

  wrap360 = degrees => {
    if (0 <= degrees && degrees < 360) return degrees // avoid rounding due to arithmetic ops if within range
    return ((degrees % 360) + 360) % 360 // sawtooth wave p:360, a:360
  }
}

export default DirectionArrow
