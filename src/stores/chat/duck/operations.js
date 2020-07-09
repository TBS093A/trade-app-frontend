import actions from './actions'
import { webSocketAddress, address } from './../../apiAddress'

export const chatOnOpen = ( data ) => 
  async ( dispatch ) => {
    dispatch(actions.wsConnect( webSocketAddress + '' + data + '/', data))
}

export const chatOnMessage = (data) => 
  async (dispatch) => {
    dispatch(actions.wsSaveMessage(data))
  }

export const chatOnClose = () => 
  async ( dispatch ) => {
    dispatch(actions.wsDisconnect())
}

const fetchGetRooms = async () => {
  const response = await
  fetch (
    address + '/chat/', {
      method: 'GET',
      credentials: 'same-origin'
  })
  const json = await response.json()
  return json
}

export const getChatRooms = () => 
  async ( dispatch ) => {
    let roomList = await fetchGetRooms()
    dispatch(actions.getRooms(roomList))
}