import actions from './actions'
import { address } from './../../apiAddress'

const fetchGetChart = async () => {
  const response = await
    fetch (
      address + '/index/exchange/' + 1800, {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchGetUserTriggers = async (userID) => {
  const response = await
    fetch (
      address + '/index/user/' + userID + '/trigger', {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchGetUserTransactions = async (userID) => {
  const response = await
    fetch (
      address + '/index/user/' + userID + '/transaction', {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchGetUserNotifications = async (userID) => {
  const response = await
    fetch (
      address + '/index/user/' + userID + '/notification', {
        method: 'GET',
        credential: 'same-origin'
      })
    const json = await response.json()
    return json
}

const fetchAddTrigger = async (data) => {
  fetch (
    address + '/index/user/' + data.user_id + '/trigger', {
      method: 'POST',
      credential: 'same-origin',
      body: JSON.stringify(data)
    }
  )
}

const fetchPrognosis = async (data) => {
    const response = await fetch (
    address + '/index/exchange/1800/prognosis/' + data.price, {
      method: 'GET',
      credential: 'same-origin'
    }
  )
  const json = response.json()
  return json
}

const fetchDeleteNotification = async (data) => {
    const response = await fetch (
    address + '/index/notification/' + data.id, {
      method: 'DELETE',
      credential: 'same-origin',
      body: JSON.stringify(data)
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

export const deleteNotification = (data) =>
  async (dispatch) => {
    dispatch(actions.deleteOldNotification(data))
    await fetchDeleteNotification(data)
  }
