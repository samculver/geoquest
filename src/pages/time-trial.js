import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Guidance from "../components/guidance"
import Countdown from "../components/countdown"
import LocationContext from "../context/locationContext"
import ModalContext, { ModalToggle, Modal } from "../context/modalContext"

class TimeTrial extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null,
    endTime: null,
    captured: 0,
  }

  componentDidMount() {
    this.startGame()
  }

  render() {
    const { targetLatitude, targetLongitude, endTime, captured } = this.state
    return (
      <Layout>
        <Guidance
          targetLatitude={targetLatitude}
          targetLongitude={targetLongitude}
          onArrive={this.onArrive}
        />
        <div className={styles.bottomDrawer}>
          <div className={styles.drawerAlwaysVisible}>
            <span>Score: {captured}</span>
            {endTime && (
              <Countdown endTime={endTime} onComplete={this.endGame} />
            )}
          </div>
          <div className={styles.drawerInitiallyHidden}>more</div>
        </div>
        <Modal id="start">
          {closeModal => (
            <>
              <h2>Time Trial</h2>
              <h3>See how many locations you can find in 5 minutes!</h3>
              <p>
                <button
                  className={styles.button}
                  onClick={() => {
                    const { lat, lng } = this.getRandomNearbyTarget()
                    this.setTarget(lat, lng)
                    this.startTimer()
                    closeModal()
                  }}
                >
                  Start!
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    closeModal()
                    navigate("/")
                  }}
                >
                  Exit
                </button>
              </p>
            </>
          )}
        </Modal>
        <Modal id="end">
          {closeModal => (
            <>
              <h2>Time's Up!</h2>
              <h3>Great Job. Here's your score:</h3>
              <h1>{captured}</h1>
              <p>
                <button
                  className={styles.button}
                  onClick={() => {
                    const { lat, lng } = this.getRandomNearbyTarget()
                    this.resetGame()
                    this.setTarget(lat, lng)
                    this.startTimer()
                    closeModal()
                  }}
                >
                  Play again
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    closeModal()
                    navigate("/")
                  }}
                >
                  Exit
                </button>
              </p>
            </>
          )}
        </Modal>
      </Layout>
    )
  }

  startGame = () => {
    // check cache for in progress game
    const cachedTarget = localStorage.getItem("randomTarget")
    const cachedEndTime = localStorage.getItem("endTime")
    if (cachedTarget && cachedEndTime) {
      const { lat, lng } = JSON.parse(cachedTarget)
      this.setTarget(lat, lng)
      this.setState({
        endTime: parseInt(cachedEndTime),
      })
      console.log(this.state)
    } else {
      // start new game
      this.props.openModal("start")
    }
  }

  endGame = () => {
    localStorage.clear()
    this.setState({
      endTime: null,
    })
    this.props.openModal("end")
  }

  resetGame = () => {
    this.setState({
      captured: 0,
    })
  }

  onArrive = () => {
    this.setState({
      captured: this.state.captured + 1,
    })
    const { lat, lng } = this.getRandomNearbyTarget()
    this.setTarget(lat, lng)
  }

  setTarget = (lat, lng) => {
    this.setState({
      targetLatitude: lat,
      targetLongitude: lng,
    })
    localStorage.setItem("randomTarget", JSON.stringify({ lat, lng }))
  }

  startTimer = () => {
    const newEndTime = Date.now() + 5 * 60 * 1000 // 5 minute
    this.setState({
      endTime: newEndTime,
    })
    localStorage.setItem("endTime", newEndTime)
  }

  getRandomNearbyTarget = () => {
    const { latitude: original_lat, longitude: original_lng } = this.context
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
      lat: newY,
      lng: newX,
    }
  }
}

//export default TimeTrial

// A way to add another context
export default props => (
  <ModalContext.Consumer>
    {({ openModal }) => <TimeTrial openModal={openModal} {...props} />}
  </ModalContext.Consumer>
)
