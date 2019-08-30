import React from "react"
import { LocationProvider } from "./src/context/locationContext"
import { OrientationProvider } from "./src/context/orientationContext"

export const wrapRootElement = ({ element }) => (
  <LocationProvider>
    <OrientationProvider>{element}</OrientationProvider>
  </LocationProvider>
)
