import actions from './actions'
import { address } from './../../apiAddress'

var jwtDecode = require('jwt-decode')

const fetchLogin = async (user) => {
  const response = await
    fetch (
      address + '/index/authUser', {
        method: 'POST',
        credential: 'same-origin',
        body: JSON.stringify(user),
      })
    const json = await response.json()
    return json
}

const fetchLogout = async (userToken) => {
  fetch (
    address + '/index/authUser', {
      method: 'DELETE',
      credential: 'same-origin',
      body: JSON.stringify(userToken),
    }
  )
}

const fetchUpdate = async (user) => {
  fetch (
    address + '/index/user/' + user.id, {
      method: 'PUT',
      credential: 'same-origin',
      body: JSON.stringify(user),
    })
}

const fetchRegister = async (user) => {
  fetch (
    address + '/index/user', {
      method: 'POST',
      credential: 'same-origin',
      body: JSON.stringify(user),
    }
  )
}

const fetchGetAllUsers = async () => {
  const response = await
  fetch (
    address + '/index/user', {
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
  async () => {
    await fetchUpdate(data)
  }

export const deleteSession = (data) =>
  async (dispatch) => {
    await fetchLogout(data)
    dispatch(actions.logout())
  }

export const registerUser = (data) =>
  async () => {
    await fetchRegister(data)
  }
