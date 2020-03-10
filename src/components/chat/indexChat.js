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