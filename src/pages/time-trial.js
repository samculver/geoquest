import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Guidance from "../components/guidance"
import Countdown from "../components/countdown"
import LocationContext from "../context/locationContext"

class TimeTrial extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null,
    endTime: Date.now() + 10 * 1000, // 10 seconds
  }

  render() {
    const { targetLatitude, targetLongitude, endTime } = this.state
    return (
      <Layout>
        <Guidance
          targetLatitude={targetLatitude}
          targetLongitude={targetLongitude}
        />
        <div className={styles.bottomDrawer}>
          <Countdown endTime={endTime} onComplete={this.onTimerEnd} />
        </div>
      </Layout>
    )
  }

  onTimerEnd = () => {
    alert("time has ended")
  }
}

export default TimeTrial
