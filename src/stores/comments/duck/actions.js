import types from './types'

const getRatingsComment = item => ({
  type: types.GET_COMMENTS_RATINGS, item
})

const addComment = item => ({
  type: types.ADD_COMMENT, item
})

export default {
  getRatingsComment,
  addComment
}
