import React, { useContext } from "react"
import { navigate } from "gatsby"
import * as queryString from 'query-string';
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
    questId: queryString.parse(this.props.location.search).id, // probably get from query string parameter here
    quest: null,
    phases: [],
    currentPhase: 1,
    isQuestComplete: false,
    enableGuidance: true,
    enableMap: true,
    enableCompass: true,
    drawerMode: "peek",
    loading: true,
  }

  componentDidMount() {
    const { questId } = this.state
    console.log(questId);
    this.getQuestData()
    /*
    if (questId) {
      const cachedQuestData = localStorage.getItem("quest" + questId)
      const cachedQuestProgress = localStorage.getItem(
        "questProgress" + questId
      )
      if (!cachedQuestData) {
        this.getQuestData()
      }
      if (cachedQuestProgress) {
        this.setQuestProgressFromCache(cachedQuestProgress)
      }
    } else {
      // invalid quest id
    }
    */
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
    } = this.state

    const phase = currentPhase > 0 ? phases[currentPhase - 1] : null

    return (
      <Layout>
        {loading && <h2>Loading</h2>}
        {!loading && !isQuestComplete && (
          <>
            {enableGuidance && !phase.fields.question && (
              <Guidance
                targetLatitude={phase.fields.location.lat}
                targetLongitude={phase.fields.location.lon}
                onArrive={this.goToNextPhase}
              />
            )}
            {phase.fields.question && phase.fields.question.length && (
              <>
                <h3>{phase.fields.question}</h3>
                <input type="text" />
              </>
            )}
            <BottomDrawer display={drawerMode}>
              <BottomDrawerPeek onClick={this.togglePeekClick}>
                {quest.fields.title}
              </BottomDrawerPeek>
              <BottomDrawerFull>
                <p>Quest description: {quest.fields.description}</p>
                {currentPhase > 0 && <p>Current phase: {phase.fields.title}</p>}
              </BottomDrawerFull>
            </BottomDrawer>
          </>
        )}
        {isQuestComplete && <h2>Quest is complete!</h2>}
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
        })
    })
  }

  setQuestProgressFromCache = () => {}

  goToNextPhase = () => {
    const { currentPhase, phases } = this.state
    console.log(phases)
    if (currentPhase < phases.length) {
      this.setState({
        currentPhase: currentPhase + 1,
      })
    } else {
      this.setState({
        isQuestComplete: true,
      })
    }
  }

  togglePeekClick = () => {
    this.setState({
      drawerMode: this.state.drawerMode == "peek" ? "full" : "peek",
    })
  }
}

export default Quest
