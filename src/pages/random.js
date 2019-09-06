import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Guidance from "../components/guidance"
import LocationContext from "../context/locationContext"
import ModalContext, { ModalToggle, Modal } from "../context/modalContext"

class Random extends React.Component {
  static contextType = LocationContext

  state = {
    targetLatitude: null,
    targetLongitude: null,
  }

  componentDidMount() {
    this.findTarget()
  }

  componentDidUpdate() {
    // not sure if this is needed; only would need if location context data arrives late.
    this.findTarget()
  }

  render() {
    const { targetLatitude, targetLongitude } = this.state
    return (
      <Layout>
        <Guidance
          targetLatitude={targetLatitude}
          targetLongitude={targetLongitude}
          onArrive={this.onArrive}
        />
        <Modal id="arrived">
          {closeModal => (
            <>
              <h2>You did it!</h2>
              <h3>Well done traveler, you have arrived :)</h3>
              <h3>Would you like to play again?</h3>
              <p>
                <button
                  className={styles.button}
                  onClick={() => {
                    const { lat, lng } = this.getRandomNearbyTarget()
                    this.setTarget(lat, lng)
                    closeModal()
                  }}
                >
                  Yes
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    closeModal()
                    navigate("/")
                  }}
                >
                  No
                </button>
              </p>
            </>
          )}
        </Modal>
      </Layout>
    )
  }

  findTarget = () => {
    const { latitude, longitude } = this.context
    const { targetLatitude, targetLongitude } = this.state

    // make sure device location is provided and no target is yet set
    if (!targetLatitude && !targetLongitude && latitude && longitude) {
      // check if target has been saved in local storage
      const cachedTarget = localStorage.getItem('randomTarget')
      if (cachedTarget) {
        const { lat, lng } = JSON.parse(cachedTarget)
        this.setTarget(lat, lng)
      } else {
        // set random target if none exists from cache
        const { lat, lng } = this.getRandomNearbyTarget()
        this.setTarget(lat, lng)
      }
    }
  }

  onArrive = () => {
    this.props.openModal("arrived")
  }

  setTarget = (lat, lng) => {
    this.setState({
      targetLatitude: lat,
      targetLongitude: lng,
    })
    localStorage.setItem('randomTarget', JSON.stringify({lat, lng}))
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

//export default Random

// A way to add another context
export default props => (
  <ModalContext.Consumer>
    {({ openModal }) => <Random openModal={openModal} {...props} />}
  </ModalContext.Consumer>
)
