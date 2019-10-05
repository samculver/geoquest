import React, { useContext } from "react"
import { navigate } from "gatsby"
import * as queryString from "query-string"
import * as contentful from "contentful"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Guidance from "../components/guidance"
import BottomDrawer, {
  BottomDrawerPeek,
  BottomDrawerFull,
} from "../components/bottomDrawer"
import LocationContext from "../context/locationContext"

class Quest extends React.Component {
  static contextType = LocationContext

  state = {
    questId: queryString.parse(this.props.location.search).id,
    quest: null,
    phases: [],
    currentPhase: 1,
    isQuestComplete: false,
    isQuestSuccessful: true,
    enableGuidance: true,
    enableMap: true,
    enableCompass: true,
    drawerMode: "peek",
    loading: true,
  }

  answerInput = React.createRef()

  componentDidMount() {
    const { questId, currentPhase } = this.state
    //this.getQuestData()

    if (questId) {
      // check cache for in-progress quest
      const cachedQuestData = localStorage.getItem("quest" + questId)
      const cachedPhaseData = localStorage.getItem("phases" + questId)
      const cachedQuestProgress = localStorage.getItem(
        "questProgress" + questId
      )
      if (cachedQuestData && cachedPhaseData && cachedQuestProgress) {
        this.setQuestProgressFromCache(
          cachedQuestData,
          cachedPhaseData,
          cachedQuestProgress
        )
      } else {
        this.getQuestData()
      }
    } else {
      // invalid quest id. do nothing for now
    }
    this.cacheQuestProgress(currentPhase, false, true)
  }

  render() {
    const {
      currentPhase,
      quest,
      phases,
      targetLatitude,
      targetLongitude,
      enableGuidance,
      drawerMode,
      loading,
      isQuestComplete,
      isQuestSuccessful,
    } = this.state

    const phase = currentPhase > 0 ? phases[currentPhase - 1] : null

    return (
      <Layout>
        {loading && <h2>Loading</h2>}
        {!loading && !isQuestComplete && quest && phases.length && (
          <>
            {phase.fields.type == "Location" && (
              <Guidance
                targetLatitude={phase.fields.location.lat}
                targetLongitude={phase.fields.location.lon}
                onArrive={this.goToNextPhase}
              />
            )}
            {phase.fields.type == "Question" && (
              <>
                <h3>{phase.fields.question}</h3>
                <input type="text" ref={this.answerInput} />
                <br />
                <br />
                <button className={styles.button} onClick={this.onSubmitAnswer}>
                  Submit
                </button>
              </>
            )}
            <BottomDrawer display={drawerMode}>
              <BottomDrawerPeek onClick={this.togglePeekClick}>
                {quest.fields.title}
              </BottomDrawerPeek>
              <BottomDrawerFull>
                <p>{quest.fields.description}</p>
                <p>{`Phase ${currentPhase} of ${phases.length}`}</p>
                {currentPhase > 0 && (
                  <p>Current objective: {phase.fields.title}</p>
                )}
              </BottomDrawerFull>
            </BottomDrawer>
          </>
        )}
        {isQuestComplete && isQuestSuccessful && (
          <>
            <h2>
              Mission accomplished.
              <br />
              This Quest is complete!
            </h2>
            <button
              className={styles.button}
              onClick={() => {
                this.removeGameCache()
                navigate("/map")
              }}
            >
              Exit
            </button>
          </>
        )}
        {isQuestComplete && !isQuestSuccessful && (
          <>
            <h2>
              Sorry! You have not completed the Quest. Please Try again :)
            </h2>
            <button
              className={styles.button}
              onClick={() => {
                navigate("/map")
              }}
            >
              Exit
            </button>
          </>
        )}
      </Layout>
    )
  }

  getQuestData = () => {
    const { questId } = this.state

    // stick initiation of 'contentful' somewhere else like as a Context ?
    var client = contentful.createClient({
      space: "wfuqmhbc9mh8",
      accessToken: "q6uRvjIkXc5hnqsW2qasEVJeFio8cOxdxIB0c4NJg0A",
    })

    client.getEntry(questId).then(entry => {
      this.setState({
        quest: entry,
      })
      localStorage.setItem("quest" + questId, JSON.stringify(entry))
      client
        .getEntries({
          "fields.quest.sys.id": questId,
          content_type: "phase",
        })
        .then(entries => {
          entries.items.sort((a, b) =>
            a.fields.order > b.fields.order ? 1 : -1
          )
          this.setState({
            phases: entries.items,
            loading: false,
          })
          localStorage.setItem(
            "phases" + questId,
            JSON.stringify(entries.items)
          )
        })
    })
  }

  setQuestProgressFromCache = (questData, phaseData, progressData) => {
    const progress = JSON.parse(progressData)
    this.setState({
      quest: JSON.parse(questData),
      phases: JSON.parse(phaseData),
      currentPhase: progress.currentPhase,
      isQuestComplete: progress.completed,
      isQuestSuccessful: progress.successful,
      loading: false,
    })
  }

  goToNextPhase = () => {
    const { currentPhase, phases, questId } = this.state
    if (currentPhase < phases.length) {
      const newPhase = currentPhase + 1
      this.setState({
        currentPhase: newPhase,
      })
      this.cacheQuestProgress(newPhase, false, true)
    } else {
      this.setState({
        isQuestComplete: true,
      })
      this.cacheQuestProgress(currentPhase, true, true)
    }
  }

  cacheQuestProgress = (currentPhase, completed, successful) => {
    const { questId } = this.state
    const progress = {
      currentPhase: currentPhase,
      completed: completed,
      successful: successful,
    }
    localStorage.setItem("questProgress" + questId, JSON.stringify(progress))
  }

  removeGameCache = () => {
    const { questId } = this.state
    localStorage.removeItem("quest" + questId)
    localStorage.removeItem("phases" + questId)
    localStorage.removeItem("questProgress" + questId)
  }

  onSubmitAnswer = () => {
    const { phases, currentPhase } = this.state
    const phase = phases[currentPhase - 1]
    const answer = this.answerInput.current.value
    const simplifyText = text => {
      return text
        .toLowerCase() // lowercase
        .replace(/\.+$/, "") // remove periods "."
      // also remove words like "the" ?
    }
    if (simplifyText(answer) == simplifyText(phase.fields.answer)) {
      alert("Correct!")
      this.goToNextPhase()
    } else {
      this.setState({
        isQuestComplete: true,
        isQuestSuccessful: false,
      })
      this.cacheQuestProgress(currentPhase, true, false)
    }
  }

  togglePeekClick = () => {
    this.setState({
      drawerMode: this.state.drawerMode == "peek" ? "full" : "peek",
    })
  }
}

export default Quest
