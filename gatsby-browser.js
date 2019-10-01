import React from "react"
import { LocationProvider } from "./src/context/locationContext"
import { OrientationProvider } from "./src/context/orientationContext"
import { UserProvider } from "./src/context/userContext"
import { ModalProvider } from "./src/context/modalContext"

export const wrapRootElement = ({ element }) => (
  <LocationProvider>
    <OrientationProvider>
      <UserProvider>
        <ModalProvider>{element}</ModalProvider>
      </UserProvider>
    </OrientationProvider>
  </LocationProvider>
)
