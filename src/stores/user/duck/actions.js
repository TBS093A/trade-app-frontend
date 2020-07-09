import types from './types'

const login = item => ({
  type: types.LOGIN_USER, item
})

const logout = item => ({
  type: types.LOGOUT_USER, item
})

export default {
  login,
  logout
}
