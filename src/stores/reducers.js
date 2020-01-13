import { combineReducers } from 'redux'
import movementsReducer from './movements/duck'
import commentReducer from './comments/duck'
import subjectReducer from './subjects/duck'
import threadReducer from './threads/duck'
import userReducer from './user/duck'

const rootReducer = combineReducers({
  user: userReducer,
  threads: threadReducer,
  subjects: subjectReducer,
  comments: commentReducer,
  movements: movementsReducer
})

export default rootReducer
