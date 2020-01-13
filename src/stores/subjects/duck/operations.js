import actions from './actions'

const fetchSubjectComments = async (subject) => {
  const response = await
    fetch('http://localhost:8001/index/subject/' + subject.id + '/comment', {
      method: 'GET',
      credentials: 'same-origin'
    });
  return response.json()
}

export const getSubjectComments = (data) =>
  async (dispatch) => {
    const comments = await fetchSubjectComments(data)
    dispatch( actions.activate(data) )
    dispatch( actions.getSubjectComments(comments) )
  }

  export const refreshSubjectComments = (data) =>
    async (dispatch) => {
      const comments = await fetchSubjectComments(data)
      dispatch( actions.getSubjectComments(comments) )
    }

const fetchAddSubject = async (data) => {
  const response = await
    fetch('http://localhost:8001/index/thread/' + data.thread_id + '/subject', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });
    return response.json()
  }

  export const addSubject = (data) =>
    async (dispatch) => {
      const comments = await fetchAddSubject(data)
    }

const fetchPutSubject = async (data) => {
  const response = await
    fetch('http://localhost:8001/index/subject/' + data.id, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });
    return response.json()
  }

  export const putSubject = (data) =>
    async (dispatch) => {
      const comments = await fetchPutSubject(data)
    }

const fetchDeleteSubject = async (data) => {
  const response = await
    fetch('http://localhost:8001/index/subject/' + data.id, {
        method: 'DELETE',
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });
    return response.json()
  }

  export const deleteSubject = (data) =>
    async (dispatch) => {
      const comments = await fetchDeleteSubject(data)
    }
