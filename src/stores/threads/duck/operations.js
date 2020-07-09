import actions from './actions'
import { address } from './../../apiAddress'

const fetchGetAll = async () => {
  const response = await
    fetch (
      address + '/index/thread', {
        method: 'GET',
        credential: 'same-origin'
      }
    )
    return response.json()
}

const fetchGetSubjects = async (threadID) => {
  const response = await
  fetch(
    address + '/index/thread/' + threadID + '/subject', {
      method: 'GET',
      credential: 'same-origin'
    }
  )
  return response.json()
}

const fetchAddThread = async (data) => {
  const response = await
  fetch(
    address + '/index/thread', {
      method: 'POST',
      credential: 'same-origin',
      body: JSON.stringify(data)
    }
  )
  return response.json()
}

const fetchUpdateThread = async (data) => {
  const response = await
  fetch(
    address + '/index/thread/' + data.id, {
      method: 'PUT',
      credential: 'same-origin',
      body: JSON.stringify(data)
    }
  )
  return response.json()
}

const fetchDeleteThread = async (data) => {
  const response = await
  fetch(
    address + '/index/thread/' + data.thread_id, {
      method: 'DELETE',
      credential: 'same-origin',
      body: JSON.stringify(data)
    }
  )
  return response.json()
}


export const getAllThreads = () =>
  async (dispatch) => {
    const allThreads = await fetchGetAll()

    dispatch( actions.getAll(allThreads) )
  }

export const refreshThreadSubjects = (threadID) =>
  async (dispatch) => {
    const subjects = await fetchGetSubjects(threadID)
    dispatch( actions.getThreadSubjects(subjects) )
  }

export const getThreadSubjects = (data) =>
  async (dispatch) => {
    const subjects = await fetchGetSubjects(data.id)
    dispatch( actions.activate(data) )
    dispatch( actions.getThreadSubjects(subjects) )
  }

export const addThread = (data) =>
  async (dispatch) => {
    const subjects = await fetchAddThread(data)
  }

export const updateThread = (data) =>
  async (dispatch) => {
    const subjects = await fetchUpdateThread(data)
  }

export const deleteThread = (data) =>
  async (dispatch) => {
    const subjects = await fetchDeleteThread(data)
  }
