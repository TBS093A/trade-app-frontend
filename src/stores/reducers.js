import { combineReducers } from 'redux'

import movementsReducer from './movements/duck'
import commentReducer from './comments/duck'
import subjectReducer from './subjects/duck'
import threadReducer from './threads/duck'
import userReducer from './user/duck'
import chatReducer from './chat/duck'
import exchangeReducer from './exchange/duck'

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  threads: threadReducer,
  subjects: subjectReducer,
  comments: commentReducer,
  movements: movementsReducer,
  exchange: exchangeReducer
})

export default rootReducer
