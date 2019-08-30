import React from "react"

const defaultState = {
  heading: null,
}

// create our context
const OrientationContext = React.createContext(defaultState)

// also create a provider to wrap around the root element
class OrientationProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      heading:null,
    }
  }

  componentDidMount() {
    if (window.DeviceOrientationAbsoluteEvent) {
      window.addEventListener(
        "DeviceOrientationAbsoluteEvent",
        this.deviceOrientationListener
      )
    } // If not, check if the device sends any orientation data
    else if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        this.deviceOrientationListener
      )
    } // Send an alert if the device isn't compatible
    else {
      alert("Sorry, we could not get your device orientation.")
    }
  }

  render() {
    const { children } = this.props
    const { heading } = this.state
    return (
      <OrientationContext.Provider
        value={{
          heading: heading,
        }}
      >
        {children}
      </OrientationContext.Provider>
    )
  }

  deviceOrientationListener = event => {
    let heading = 0, // default north
      alpha = event.alpha, //z axis rotation [0,360)
      beta = event.beta, //x axis rotation [-180, 180]
      gamma = event.gamma //y axis rotation [-90, 90]      //Check if absolute values have been sent
    if (typeof event.webkitCompassHeading !== "undefined") {
      alpha = event.webkitCompassHeading //iOS non-standard
      heading = alpha
    } else {
      // Your device is reporting relative alpha values, so this compass won't point north :(
      heading = 360 - alpha //heading [0, 360)
    }

    this.setState({
      heading: heading.toFixed([0]),
    })
  }
}

export default OrientationContext

export { OrientationProvider }
