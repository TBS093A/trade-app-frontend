import actions from './actions'
import { address } from './../../apiAddress'

const fetchRatingsComment = async (comment) => {
  const response = await
    fetch (address + '/index/comment/' + comment.id + '/rating', {
      method: 'GET',
      credentials: 'same-origin'
    });
  return response.json()
}

const fetchAddRating = async (data) => {
  fetch (address + '/index/comment/' + data.comment_id + '/rating', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
}

const fetchUpdateRating = async (rating) => {
  fetch (address + '/index/rating/' + rating.id, {
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify(rating)
  })
}

export const getCommentRatings = (data) =>
  async (dispatch) => {
    let ratings = []
    for(let x = 0; x < data.length; x++) {
      const rating = await fetchRatingsComment(data[x])
      for(let y = 0; y < rating.length; y++)
       rating[y].userRating = 0
      ratings[x] = rating
    }
    dispatch( actions.getRatingsComment(ratings) )
  }

export const addRatingComment = (data) =>
  async (dispatch) => {
    await fetchAddRating(data)
  }

export const updateRatingComment = (data) =>
  async (dispatch) => {
    await fetchUpdateRating(data)
  }

const fetchAddComment = async (data) => {
  fetch (address + '/index/subject/' + data.subject_id + '/comment', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
}

const fetchUpdateComment = async (data) => {
  fetch (address + '/index/comment/' + data.id, {
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
}

const fetchDeleteComment = async (data) => {
  fetch (address + '/index/comment/' + data.id, {
    method: 'Delete',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
}

export const addComment = (data) =>
  async (dispatch) => {
    await fetchAddComment(data)
  }

export const updateComment = (data) =>
  async (dispatch) => {
    await fetchUpdateComment(data)
  }

export const deleteComment = (data) =>
  async (dispatch) => {
    await fetchDeleteComment(data)
  }
