import types from './types'

const INITIAL_STATE = {
  candles: [],
  userTriggers: [],
  userNotifications: [],
  userTransactions: [],
  prognosis: {
    price_forecast: 0,
    percent_of_difference: 0,
    course_on_payment: 0,
    svg_of_all: 0,
    date_of_transaction: ''
  }
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
    case types.DELETE_NOTIFICATION:
      return {
        ...state,
        userNotifications: state.userNotifications.filter(
            notify => notify.id !== action.item.id
          )
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
        userTransactions: [],
        prognosis: {
          price_forecast: 0,
          percent_of_difference: 0,
          course_on_payment: 0,
          svg_of_all: 0,
          date_of_transaction: ''
        }
      }
    default:
      return state
  }
}

export default exchangeReducer
