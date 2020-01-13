import types from './types'

const getRatingsComment = item => ({
  type: types.GET_COMMENTS_RATINGS, item
})

export default {
  getRatingsComment
}
