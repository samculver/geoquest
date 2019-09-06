import React from "react"
import ReactDOM from 'react-dom'
import styles from "../styles.module.scss"

const defaultState = {
  openModalId: null,
  openModal: () => {},
  closeModal: () => {}
}

// create our context
const ModalContext = React.createContext(defaultState)

const ModalToggle = ({ id, children }) => (
  <ModalContext.Consumer>
    {({ openModal }) => children(() => openModal(id))}
  </ModalContext.Consumer>
)

const portalRoot = typeof document !== `undefined` ? document.getElementById('portal') : null

const Modal = ({ id, children }) => (
  <ModalContext.Consumer>
    {({ closeModal, openModalId }) => {
      if (openModalId === id) {
        return ReactDOM.createPortal(
          <div className={`${styles.modalOverlay} ${styles.flexCenter}`}>
            <div className={styles.modal}>{children(closeModal)}</div>
          </div>,
          portalRoot
        )
      }

      return null
    }}
  </ModalContext.Consumer>
)

// also create a provider to wrap around the root element
class ModalProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openModalId: null,
    }
  }

  openModal(id) {
    this.setState({ openModalId: id })
  }

  closeModal() {
    this.setState({ openModalId: null })
  }

  render() {
    return (
      <ModalContext.Provider
        value={{
          openModalId: this.state.openModalId,
          openModal: id => this.openModal(id),
          closeModal: () => this.closeModal(),
        }}
      >
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

export default ModalContext

export { ModalProvider, ModalToggle, Modal }
