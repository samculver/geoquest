import React from "react"
import { default as CountdownNow } from "react-countdown-now"
import styles from "../styles.module.scss"

// Random component
const Countdown = (props) => {
  // endTime example: Date.now() + 10000
  const { endTime, onComplete } = props
  const renderer = ({ hours, minutes, seconds, completed }) => {
    minutes = minutes += hours * 60
    return (
      <span>
        {minutes}:{seconds}
      </span>
    )
  }

  return <CountdownNow date={endTime} renderer={renderer} onComplete={onComplete} />
}

export default Countdown
