import React from "react"

const defaultState = {
  id: null,
  name: null,
  facebookId: null,
  picture: null,
  loggedIn: false,
  setUser: () => {},
  logout: () => {},
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
      loggedIn: false
    }
  }

  componentDidMount() {
    const cachedUserData = localStorage.getItem("user");
    console.log(cachedUserData)
    if(cachedUserData){
      this.setUser(JSON.parse(cachedUserData));
    }
  }

  setUser(data) {
    const { name, id: facebookId, picture } = data
    this.setState({ name, facebookId, picture, loggedIn: true })
    localStorage.setItem("user", JSON.stringify(data))
  }

  logout() {
    this.setState({ name: null, facebookId: null, picture: null, loggedIn: false })
    localStorage.clear()
  }

  render() {
    const { children } = this.props
    const { id, name, facebookId, picture, loggedIn } = this.state
    return (
      <UserContext.Provider
        value={{
          id,
          name,
          facebookId,
          picture,
          loggedIn,
          setUser: (data) => this.setUser(data),
          logout: () => this.logout(),
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }
