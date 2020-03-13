import types from './types'

const INITIAL_STATE = {
    lobby: '',
    socket: '',
    messages: []
}

const chatReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case types.WS_CONNECT:
            return {
                ...state,
                socket: new WebSocket(action.host)
            }
    }
}