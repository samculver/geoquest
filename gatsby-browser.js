import React from "react"
import { LocationProvider } from "./src/context/locationContext"
import { OrientationProvider } from "./src/context/orientationContext"
import { ModalProvider } from "./src/context/modalContext"

export const wrapRootElement = ({ element }) => (
  <LocationProvider>
    <OrientationProvider>
      <ModalProvider>{element}</ModalProvider>
    </OrientationProvider>
  </LocationProvider>
)
