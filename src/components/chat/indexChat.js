import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { chatOnMessage, getChatRooms } from '../../stores/chat/duck/operations'

import ChatConnect from './chatConnect'

import '../../styles/indexChat.scss'

import imageIco from '../../images/imageIco.png'

const IndexChat = ({ user, chat, chatOnMessage, getChatRooms }) => {
    
    const [chatVisible, setChatVisible] = useState(false)
    const [chatImageVisible, setChatImageVisible] = useState( { visible: false, image: ''} )

    const inputMessageText = React.createRef()

    useEffect( () => { getChatRooms() }, [] )

    if ( chat.host !== '' )
        chat.webSocket.onmessage = (event) => {
            chatOnMessage(JSON.parse(event.data))
        }

    const sendMessage = (event) => {
        event.preventDefault()

        let checkUploadValue = document.getElementById('fileItem').value
        
        if ( inputMessageText.current.value !== '' && checkUploadValue !== '' && chat.host !== '' ) {

            let inputMessageImage = document.getElementById('fileItem').files[0]
            
            let message = {
                userID: user.id,
                userName: user.login,
                avatar: user.avatar,
                text: inputMessageText.current.value,
                textOnly: false,
                imageOnly: false
            }
            inputMessageText.current.value = ''
            document.getElementById('fileItem').value = ''
            sendBase64Image(inputMessageImage, message)
        }
        else if (inputMessageText.current.value !== '' && chat.host !== '' ) {
            let message = {
                userID: user.id,
                userName: user.login,
                avatar: user.avatar,
                text: inputMessageText.current.value,
                textOnly: true,
                imageOnly: false
            }
            inputMessageText.current.value = ''
            chat.webSocket.send(JSON.stringify(message))
        } 
        else if ( checkUploadValue !== '' ) {
            let inputMessageImage = document.getElementById('fileItem').files[0]
            let message = {
                userID: user.id,
                userName: user.login,
                avatar: user.avatar,
                textOnly: false,
                imageOnly: true
            }
            document.getElementById('fileItem').value = ''
            sendBase64Image(inputMessageImage, message)
        }
        else
            inputMessageText.current.value = 'Type message'
    }

    const sendBase64Image = (image, message) => {
        let reader = new FileReader()
        reader.onload = () => {
            message.image = reader.result
            chat.webSocket.send(JSON.stringify(message))
        }
        reader.readAsDataURL(image)
    }

    return (
        <div className={ chatVisible === true ? (chat.host !== '' ? 'chatWindowOpen' : 'chatWindowChangeLobby') : 'chatWindowHide'}>
            <div 
                className='chatMenuBar'
                onClick={ () => setChatVisible( !chatVisible ) }>
                    chat
            </div>
            <div className='chatBody'>
                <div className='lobbyMessage'>
                    <ChatConnect/>
                </div>
                <div className='listMessage'>
                    { chat.host !== '' ? chat.messages.map( (message, key) => {
                                if ( chatImageVisible.visible )
                                    return (
                                        <div className='imageFullStyle' onClick={ () => setChatImageVisible( { visible: !chatImageVisible.visible, image: '' } ) }>
                                            <img src={ chatImageVisible.image } />
                                        </div>
                                    )
                                if (message.userID === -1)
                                    return (
                                        <div></div>
                                    )
                                else if (message.userID === user.id)
                                    return (
                                        <div className='rowMessage' key={key}>
                                            <div className="chatAvatar">
                                                <img src={message.avatar} title={message.userName} />
                                            </div>
                                            <div className='chatMessageDisplay' onClick={ message.textOnly !== true ? () => setChatImageVisible( { visible: !chatImageVisible.visible, image: message.image } ) : () => {} }>
                                                { message.imageOnly === false ? 
                                                        <div className={ message.imageOnly !== message.textOnly ? 'userMessage': 'userMessage messageWithImage' }>
                                                            {message.text}
                                                        </div> 
                                                    : 
                                                        <div></div> 
                                                }
                                                { message.textOnly === false ? <img src={message.image} /> : <div></div>}
                                            </div>
                                        </div>
                                    )
                                else
                                    return (
                                        <div className='rowMessage' key={key}>
                                            <div className="chatAvatar">
                                                <img src={message.avatar} title={message.userName} />
                                            </div>
                                            <div className='chatMessageDisplay' onClick={ message.textOnly !== true ? () => setChatImageVisible( { visible: !chatImageVisible.visible, image: message.image } ) : () => {} }>
                                                { message.imageOnly === false ? 
                                                        <div className={ message.imageOnly !== message.textOnly ? 'otherMessage': 'otherMessage messageWithImage' }>
                                                            {message.text}
                                                        </div> 
                                                    : 
                                                        <div></div> 
                                                }
                                                { message.textOnly === false ? <img src={message.image} /> : <div></div>}
                                            </div>
                                        </div>
                                    )
                            } 
                        )
                        :   ( chat.rooms.lenght === 0 ? 
                            () => {
                                return (
                                    <div className='chatListItem'> 
                                        Create first lobby!
                                    </div>
                                )
                            }
                            :
                            chat.rooms.map( (room, key) => {
                                return (
                                    <div key={ key } className='chatListItem'>
                                        { key + 1 }. Lobby: { room.name },  Users: { room.userCount }
                                    </div> 
                                )
                            }
                        )
                        )
                    }
                </div>
                <div className='textMessage'>
                    <form onSubmit={ sendMessage }>
                        <input 
                            className='inputFile'
                            type='file' 
                            id='fileItem' />
                        <img 
                            className='inputFile'
                            src={ imageIco } />
                        <input 
                            placeholder='message'
                            ref={ inputMessageText } />
                        <button>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat
  })
  
  const mapDispatchToProps = dispatch => ({
    chatOnMessage: chat => dispatch( chatOnMessage(chat) ),
    getChatRooms: chat => dispatch( getChatRooms(chat) )
  })

export default connect(mapStateToProps, mapDispatchToProps)(IndexChat)