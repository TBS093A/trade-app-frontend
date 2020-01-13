import types from './types'

const INITIAL_STATE = {
  commentsList: [],
  actualSubjectID: -1,
  actualSubjectName: '',
  actualSubjectAuthor: '',
  actualSubjectAuthorID: -1,
  isActive: false
}

const subjectReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case types.GET_SUBJECT_COMMENTS:
        return {
          ...state,
          commentsList: action.item
        }
      case types.ACTIVATE:
        return {
          ...state,
          actualSubjectID: action.item.id,
          actualSubjectName: action.item.name,
          actualSubjectAuthor: action.item.author,
          actualSubjectAuthorID: action.item.user_id,
          isActive: true
        }
      case types.DEACTIVATE:
       return {
         ...state,
         actualSubjectID: -1,
         actualSubjectName: '',
         actualSubjectAuthor: '',
         actualSubjectAuthorID: -1,
         isActive: false
       }
      default:
        return state;
    }
}

export default subjectReducer
