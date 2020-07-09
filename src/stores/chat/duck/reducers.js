import types from './types'

const INITIAL_STATE = {
    host: '',
    lobby: '',
    connected: false,
    messages: [],
    rooms: []
}

const chatReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case types.GET_ROOMS_LIST:
            return {
                ...state,
                rooms: action.host
            }
        case types.WS_CONNECT:
            return {
                ...state,
                connected: true,
                lobby: action.lobby,
                host: action.host,
                webSocket: new WebSocket(action.host)
            }
        case types.WS_SAVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.host]
            }
        case types.WS_DISCONNECT:
            return {
                ...state,
                webSocket: '',
                lobby: '',
                connected: false,
                messages: [],
                host: ''
            }
        default:
            return state;
    }
}

export default chatReducer