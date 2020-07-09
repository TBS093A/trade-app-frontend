import React from 'react'
import { connect } from 'react-redux'

import { chatOnOpen, chatOnClose, getChatRooms } from '../../stores/chat/duck/operations'

import '../../styles/indexChat.scss'

const ChatConnect = ({ chat, chatOnOpen, chatOnClose, getChatRooms }) => {

    const inputLobbyName = React.createRef()

    const setLobbyName = (event) => {
        event.preventDefault()
        if ( inputLobbyName.current.value !== '' ){
            chatOnOpen(inputLobbyName.current.value)
        }
        else
            inputLobbyName.current.value = 'Get a lobby name!'
    }

    const disconnect = (event) => {
        event.preventDefault()
        try{
            chat.webSocket.close()
            chatOnClose()
            getChatRooms()
        }catch {
            chatOnClose()
            getChatRooms()
        }
    }

    if (chat.connected === false)
        return (
            <form onSubmit={ setLobbyName }>
                <input 
                    placeholder='lobby / room name'
                    ref={ inputLobbyName } />
                <button >
                    Connect
                </button>
            </form> 
        )
    else
        return (
            <form onSubmit={ disconnect }>
                <div className='lobbyName'>
                    Lobby: { chat.lobby }
                </div>
                <button >
                    Disconnect
                </button>
            </form>
        )
}

const mapStateToProps = state => ({
    chat: state.chat
  })
  
  const mapDispatchToProps = dispatch => ({
    chatOnOpen: chat => dispatch( chatOnOpen(chat) ),
    chatOnClose: chat => dispatch( chatOnClose(chat) ),
    getChatRooms: chat => dispatch( getChatRooms(chat) )
  })

export default connect(mapStateToProps, mapDispatchToProps)(ChatConnect)