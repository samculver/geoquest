import React from "react"
import { LocationProvider } from "./src/context/locationContext"

export const wrapRootElement = ({ element }) => (
  <LocationProvider>{element}</LocationProvider>
)
