import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import '../../styles/indexChat.scss'

const IndexChat = ({ user }) => {

    const [chatVisible, setChatVisible] = useState(false)

    return (
        <div className={ chatVisible === true ? 'chatWindowOpen' : 'chatWindowHide'}>
            <div 
                className='chatMenuBar'
                onClick={ () => setChatVisible( !chatVisible ) }>
                    chat
            </div>
            <div className='chatBody'>
                <div className='lobbyMessage'>
                    <form>
                        <input placeholder='lobby / room name'/>
                        <button type='submit'>Connect</button>
                    </form>
                </div>
                <div className='listMessage'>
                    <div className='rowMessage'>
                        <div className="chatAvatar">
                        </div>
                        <div className='userMessage'>
                            niesamowite naprwdę nie wierygodne
                        </div>
                    </div>
                    <div className='rowMessage'>
                        <div className="chatAvatar">
                        </div>
                        <div className='otherMessage'>
                            xd
                        </div>
                    </div>
                </div>
                <div className='textMessage'>
                    <form>
                        <input placeholder='message'/>
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
  })
  
  const mapDispatchToProps = dispatch => ({
    
  })

export default connect(mapStateToProps, mapDispatchToProps)(IndexChat)