import actions from './actions'
import { webSocketAddress } from './../../apiAddress'

// export const chatConnect = ( lobby ) => 
//   async ( dispatch ) => {
//     const host =  webSocketAddress + '' + lobby;
//     try {
//         dispatch(actions.wsConnect(host));
//     } catch {
//         console.log('chat connect error');
//     }
// }

export const chatOnOpen = ( event ) => 
  async ( dispatch ) => {
    console.log('websocket open', event.target.url)
    dispatch(actions.wsConnected(event.target.url))
}

export const chatOnClose = () => 
  async ( dispatch ) => {
    dispatch(actions.wsDisconnected())
}

export const chatOnMessage = ( event ) => 
  async ( dispatch ) => {
    const payload = JSON.parse(event.data)
    dispatch(actions.wsSaveMessage(payload))
}