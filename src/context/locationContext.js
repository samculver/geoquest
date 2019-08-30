import React from "react"

const defaultState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  timestamp: null,
}

// create our context
const LocationContext = React.createContext(defaultState)

// also create a provider to wrap around the root element
class LocationProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: null,
      longitude: null,
      accuracy: null,
      timestamp: null,
      settings: {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 0,
      },
    }
  }

  componentDidMount() {
    const geo = navigator.geolocation
    if (!geo) {
      alert("Geolocation is not supported")
      return
    }
    let watcher = geo.watchPosition(
      this.onChange,
      this.onError,
      this.state.settings
    )
  }

  render() {
    const { children } = this.props
    const { latitude, longitude, accuracy, timestamp } = this.state
    return (
      <LocationContext.Provider
        value={{
          latitude,
          longitude,
          accuracy,
          timestamp,
        }}
      >
        {children}
      </LocationContext.Provider>
    )
  }

  onChange = ({ coords, timestamp }) => {
    this.setState({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    })
  }

  onError = error => {
    alert(error.message)
  }
}

export default LocationContext

export { LocationProvider }
