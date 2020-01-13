import types from './types'

const INITIAL_STATE = {
  ratingsCommentList: [],
}

function commentReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case types.GET_COMMENTS_RATINGS:
        return {
          ...state,
          ratingsCommentList: action.item
        }
      default:
        return state;
    }
}

export default commentReducer
