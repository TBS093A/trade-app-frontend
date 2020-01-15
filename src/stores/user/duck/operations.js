import actions from './actions'

var jwtDecode = require('jwt-decode')

const fetchLogin = async (user) => {
  const response = await
    fetch (
      'http://localhost:8001/index/authUser', {
        method: 'POST',
        credential: 'same-origin',
        body: JSON.stringify(user),
      })
    const json = await response.json()
    return json
}

const fetchLogout = async (userToken) => {
  fetch (
    'http://localhost:8001/index/authUser', {
      method: 'DELETE',
      credential: 'same-origin',
      body: JSON.stringify(userToken),
    }
  )
}

const fetchUpdate = async (user) => {
  fetch (
    'http://localhost:8001/index/user/' + user.id, {
      method: 'PUT',
      credential: 'same-origin',
      body: JSON.stringify(user),
    })
}

const fetchRegister = async (user) => {
  fetch (
    'http://localhost:8001/index/user', {
      method: 'POST',
      credential: 'same-origin',
      body: JSON.stringify(user),
    }
  )
}

const fetchGetAllUsers = async () => {
  const response = await
  fetch (
    'http://localhost:8001/index/user', {
      method: 'GET',
      credential: 'same-origin'
    }
  )
  const json = response.json()
  return json
}

export const createSession = (data) =>
  async (dispatch) => {
    const token = await fetchLogin(data)
    let user = jwtDecode(token.token)

    let allUsers = await fetchGetAllUsers()

    let userFull = {
      token: token.token,
      id: user.payload.id,
      login: user.payload.login,
      privilige: user.payload.privilige,
      avatar: user.payload.avatar,
      email: user.payload.email,
      allUsersList: allUsers
    }

    dispatch(actions.login(userFull))
  }

export const updateSession = (data) =>
  async (dispatch) => {
    await fetchUpdate(data)
  }

export const deleteSession = (data) =>
  async (dispatch) => {
    await fetchLogout(data)
    dispatch(actions.logout())
  }

export const registerUser = (data) =>
  async (dispatch) => {
    await fetchRegister(data)
  }
