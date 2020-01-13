import types from './types'

const INITIAL_STATE = {
  threadsList: [],
  actualThreadID: -1,
  actualThreadName: '',
  actualThreadModeratorID: -1,
  actualThreadModerator: '',
  subjectsList: [],
  isActive: false
}

const threadReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case types.GET_ALL_THREADS:
        return {
          ...state, threadsList: action.item
        }
      case types.GET_THREAD_SUBJECTS:
        return {
          ...state, subjectsList: action.item
        }
      case types.ACTIVATE_THREAD:
        return {
          ...state,
          actualThreadID: action.item.id,
          actualThreadName: action.item.name,
          actualThreadModeratorID: action.item.user_id,
          actualThreadModerator: action.item.moderator,
          isActive: true
        }
      case types.DEACTIVATE_THREAD:
        return {
          ...state,
          actualThreadID: -1,
          actualThreadName: '',
          actualThreadModeratorID: -1,
          actualThreadModerator: '',
          isActive: false
        }
      default:
        return state;
    }
}

export default threadReducer
