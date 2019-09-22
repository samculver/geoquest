import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import BottomDrawer, {
  BottomDrawerPeek,
  BottomDrawerFull,
} from "../components/bottomDrawer"
import Div100vh from "react-div-100vh"
import * as contentful from "contentful"
import GoogleMapReact from "google-map-react"
import { TiUser, TiLocation } from "react-icons/ti"
import { GiTreasureMap } from "react-icons/gi"

import LocationContext from "../context/locationContext"
import ModalContext, { ModalToggle, Modal } from "../context/modalContext"

class Find extends React.Component {
  static contextType = LocationContext

  state = {
    quests: [],
    drawerMode: null,
    selectedQuest: null,
    mapZoom: 17,
  }

  componentDidMount() {
    // get nearby quests from Contentful
    this.getQuestsData()
  }

  render() {
    const {
      quests,
      drawerMode,
      questIsSelected,
      selectedQuest,
      mapZoom,
    } = this.state
    const { latitude, longitude, accuracy } = this.context

    return (
      <Layout>
        <div className={styles.commandBar}>
          <div className={styles.navModes}>
            <GiTreasureMap
              className={styles.logoNav}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
        <Div100vh className={styles.map}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyD4SADWp_Jb34U61H8mFrBimnutRBGqGLs",
            }}
            defaultCenter={{
              lat: latitude,
              lng: longitude,
            }}
            defaultZoom={mapZoom}
            onClick={this.onClickMap}
          >
            <TiUser className={styles.mapIcon} lat={latitude} lng={longitude} />
            {quests.map(quest => {
              const location = quest.fields.location
              const selectedClass =
                selectedQuest && selectedQuest.sys.id == quest.sys.id
                  ? styles.selected
                  : ""
              return (
                <TiLocation
                  className={`${styles.mapIcon} ${
                    styles.clickable
                  } ${selectedClass}`}
                  lat={location.lat}
                  lng={location.lon}
                  onClick={ev => this.onClickMapPoint(ev, quest)}
                />
              )
            })}
          </GoogleMapReact>
        </Div100vh>
        <BottomDrawer display={drawerMode}>
          <BottomDrawerPeek onClick={this.togglePeekClick}>
            {selectedQuest && <span>{selectedQuest.fields.title}</span>}
          </BottomDrawerPeek>
          <BottomDrawerFull>
            {selectedQuest && (
              <>
                <p>Estimated time: {selectedQuest.fields.timeToComplete}</p>
                <p>Estimated travel: {selectedQuest.fields.distanceToTravel}</p>
                <button className={styles.button} onClick={()=>{navigate('quest?'+selectedQuest.sys.id)}}>Start</button>
              </>
            )}
          </BottomDrawerFull>
        </BottomDrawer>
      </Layout>
    )
  }

  getQuestsData = () => {
    // stick initiation of 'contentful' somewhere else like as a Context ?
    var client = contentful.createClient({
      space: "wfuqmhbc9mh8",
      accessToken: "q6uRvjIkXc5hnqsW2qasEVJeFio8cOxdxIB0c4NJg0A",
    })
    client
      .getEntries({
        'content_type': "quest",
        'fields.active': true,
        'limit': 20,
        'order': "sys.createdAt",
      })
      .then(entries => {
        console.log(entries.items)
        this.setState({
          quests: entries.items,
        })
      })
  }

  onClickMapPoint = (ev, quest) => {
    ev.stopPropagation()
    this.setState({
      selectedQuest: quest,
      drawerMode: "peek",
    })
  }
  onClickMap = () => {
    this.setState({
      selectedQuest: null,
      drawerMode: null,
    })
  }

  startQuest = () => {}

  togglePeekClick = () => {
    this.setState({
      drawerMode: this.state.drawerMode == "peek" ? "full" : "peek",
    })
  }
}

// A way to add another context
export default props => (
  <ModalContext.Consumer>
    {({ openModal }) => <Find openModal={openModal} {...props} />}
  </ModalContext.Consumer>
)
