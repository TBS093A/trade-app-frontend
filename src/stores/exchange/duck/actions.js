import types from './types'

const setChart = item => ({
  type: types.GET_CANDLES_CHART, item
})

const setTriggers = item => ({
  type: types.GET_USER_TRIGGERS, item
})

const setNotifications = item => ({
  type: types.GET_USER_NOTIFICATIONS, item
})

const setTransactions = item => ({
  type: types.GET_USER_TRANSACTIONS, item
})

const deleteOldNotification = item => ({
  type: types.DELETE_NOTIFICATION, item
})

const addNewTrigger = item => ({
  type: types.ADD_NEW_TRIGGER, item
})

const setNewPrognosis = item => ({
  type: types.NEW_PROGNOSIS, item
})

const reset = item => ({
  type: types.RESET, item
})

export default {
  setChart,
  setTriggers,
  setNotifications,
  setTransactions,
  deleteOldNotification,
  addNewTrigger,
  setNewPrognosis,
  reset
}
