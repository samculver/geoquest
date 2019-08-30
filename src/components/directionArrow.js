import React from "react"
import styles from "../styles.module.scss"
import OrientationContext from "../context/orientationContext"

class DirectionArrow extends React.Component {
  static contextType = OrientationContext

  state = {
    arrowDegrees: null,
  }

  render() {
    const { headingDegree } = this.context
    return <><p>Heading: {headingDegree}</p></>
  }
}

export default DirectionArrow
