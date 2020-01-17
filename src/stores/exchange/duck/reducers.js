import types from './types'

const INITIAL_STATE = {
  candles: [],
  userTriggers: [],
  userNotifications: [],
  userTransactions: [],
  prognosis: {}
}

const exchangeReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.GET_CANDLES_CHART:
      return {
        ...state,
        candles: action.item
      }
    case types.GET_USER_TRIGGERS:
      return {
        ...state,
        userTriggers: action.item
      }
    case types.GET_USER_NOTIFICATIONS:
      return {
        ...state,
        userNotifications: action.item
      }
    case types.GET_USER_TRANSACTIONS:
      return {
        ...state,
        userTransactions: action.item
      }
    case types.NEW_PROGNOSIS:
      return {
        ...state,
        prognosis: action.item
      }
    case types.RESET:
      return {
        ...state,
        userTriggers: [],
        userNotifications: [],
        userTransactions: []
      }
    default:
      return state
  }
}

export default exchangeReducer
