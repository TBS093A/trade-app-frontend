import actions from './actions'

const fetchGetChart = async () => {
  const response = await
    fetch (
      'http://localhost:8001/index/exchange/' + 1800, {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchGetUserTriggers = async (userID) => {
  const response = await
    fetch (
      'http://localhost:8001/index/trigger/' + userID, {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchGetUserTransactions = async (userID) => {
  const response = await
    fetch (
      'http://localhost:8001/index/user/' + userID + '/transaction', {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchGetUserNotifications = async (userID) => {
  const response = await
    fetch (
      'http://localhost:8001/index/user/' + userID + '/notification', {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

export const getChart = () =>
  async (dispatch) => {
    const chart = await fetchGetChart()
    dispatch(actions.setChart(chart))
  }

export const getUserTriggers = () =>
  async (dispatch) => {
    const triggers = await fetchGetUserTriggers()
    dispatch(actions.setUserTriggers(triggers))
  }

export const getUserTransactions = () =>
  async (dispatch) => {
    const transactions = await fetchGetUserTransactions()
    dispatch(actions.setUserTransactions(transactions))
  }

export const getUserNotifications = () =>
  async (dispatch) => {
    const notifications = await fetchGetUserNotifications()
    dispatch(actions.setUserNotifications(notifications))
  }
