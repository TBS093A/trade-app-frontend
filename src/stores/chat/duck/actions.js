import types from './types'

const wsConnect = (host, lobby) => ({
  type: types.WS_CONNECT, host, lobby
});

const wsSend = host => ({
    type: types.WS_SEND, host
});

const wsDisconnect = host => ({
    type: types.WS_DISCONNECT, host
});

const wsSaveMessage = host => ({
    type: types.WS_SAVE_MESSAGE, host
})

const getRooms = host => ({
    type: types.GET_ROOMS_LIST, host
})

export default {
  wsConnect,
  wsSend,
  wsDisconnect,
  wsSaveMessage,
  getRooms
}