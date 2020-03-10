import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { saveState, loadState } from './localStorage';
import lodash from 'lodash';

//const store = createStore(rootReducer) //, composeWithDevTools(applyMiddleware(thunk))

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)))

console.log(store.getState())

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    exchange: store.getState().exchange,
    comments: store.getState().comments,
    subjects: store.getState().subjects,
    threads: store.getState().threads,
    movements: store.getState().movements
  });
});

store.subscribe(lodash.throttle(() => {
  saveState({
    user: store.getState().user,
    exchange: store.getState().exchange,
    comments: store.getState().comments,
    subjects: store.getState().subjects,
    threads: store.getState().threads,
    movements: store.getState().movements
  });
}, 1000));

export default preloadedState => {
  return createStore(rootReducer, preloadedState)
}
