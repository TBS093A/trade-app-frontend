import actions from './actions'

const fetchGetAll = async () => {
  const response = await
    fetch (
      'http://localhost:8001/index/thread', {
        method: 'GET',
        credential: 'same-origin'
      }
    )
    return response.json()
}

const fetchGetSubjects = async (threadID) => {
  const response = await
  fetch(
    'http://localhost:8001/index/thread/' + threadID + '/subject', {
      method: 'GET',
      credential: 'same-origin'
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
