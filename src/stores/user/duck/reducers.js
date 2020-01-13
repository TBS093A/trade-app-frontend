import types from './types'

const INITIAL_STATE = {
  id: -1,
  login: '',
  email: '',
  privilige: '',
  avatar: '',
  token: '',
  isActive: false
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.LOGIN_USER:
      return { ...state,
        id: action.item.id,
        login: action.item.login,
        privilige: action.item.privilige,
        email: action.item.email,
        avatar: action.item.avatar,
        token: action.item.token,
        isActive: true
      }
    case types.LOGOUT_USER:
      return {
        isActive: false
      }
    default:
      return state;
  }
}

export default userReducer
