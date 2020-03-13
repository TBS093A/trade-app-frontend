import types from './types'

const wsConnect = host => ({
  type: types.WS_CONNECT, host
});

const wsConnecting = host => ({
    type: types.WS_CONNECTING, host
});

const wsConnected = host => ({
  type: types.WS_CONNECTED, host
});

const wsDisconnect = host => ({
    type: types.WS_DISCONNECT, host
});
  
const wsDisconnected = host => ({
    type: types.WS_DISCONNECTED, host
});

const wsSaveMessage = host => ({
    type: types.WS_SAVE_MESSAGE, host
})

export default {
  wsConnect,
  wsConnecting,
  wsConnected,
  wsDisconnect,
  wsDisconnected,
  wsSaveMessage
}