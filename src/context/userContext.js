import React from "react"

const defaultState = {
  id: null,
  name: null,
  facebookId: null,
  picture: null,
  setUser: () => {},
}

// create our context
const UserContext = React.createContext(defaultState)

// also create a provider to wrap around the root element
class UserProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      name: null,
      facebookId: null,
      picture: null,
    }
  }

  setUser({ name, id: facebookId, picture }) {
    this.setState({ name, facebookId, picture })
  }

  render() {
    const { children } = this.props
    const { id, name, facebookId, picture } = this.state
    return (
      <UserContext.Provider
        value={{
          id,
          name,
          facebookId,
          picture,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }
