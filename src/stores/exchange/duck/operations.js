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
      'http://localhost:8001/index/user/' + userID + '/trigger', {
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

const fetchAddTrigger = async (data) => {
  fetch (
    'http://localhost:8001/index/user/' + data.user_id + '/trigger', {
      method: 'POST',
      credential: 'same-origin',
      body: JSON.stringify(data)
    }
  )
}

const fetchPrognosis = async (data) => {
    const response = await fetch (
    'http://localhost:8001/index/exchange/1800/prognosis/' + data.price, {
      method: 'GET',
      credential: 'same-origin'
    }
  )
  const json = response.json()
  return json
}

export const getChart = () =>
  async (dispatch) => {
    const chart = await fetchGetChart()
    dispatch(actions.setChart(chart))
  }

export const getUserTriggers = (userID) =>
  async (dispatch) => {
    const triggers = await fetchGetUserTriggers(userID)
    dispatch(actions.setTriggers(triggers))
  }

export const getUserTransactions = (userID) =>
  async (dispatch) => {
    const transactions = await fetchGetUserTransactions(userID)
    dispatch(actions.setTransactions(transactions))
  }

export const getUserNotifications = (userID) =>
  async (dispatch) => {
    const notifications = await fetchGetUserNotifications(userID)
    dispatch(actions.setNotifications(notifications))
  }

export const addTrigger = (data) =>
  async (dispatch) => {
    await fetchAddTrigger(data)
  }

export const checkPrognosis = (data) =>
  async (dispatch) => {
    const prognosis = await fetchPrognosis(data)
    dispatch(actions.setNewPrognosis(prognosis))
  }
