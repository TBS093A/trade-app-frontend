import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { deleteNotification, getUserNotifications } from '../../stores/exchange/duck/operations'

import '../../styles/indexExchange.scss'

const ExchangeNotifications = ({
  user,
  exchange, deleteNotification, getUserNotifications }) => {

  useEffect( () => { getUserNotifications(user.id) }, [] )

  const deleteOldNotification = (notifyID) => {
    let notify = {
      id: notifyID,
      token: user.token
    }
    deleteNotification(notify)
  }

  return (
    <div className='exchangeNotificationsDiv'>
      <p>{ user.login } exchange notifications:</p>
      <div className='notifyList'>
        { exchange.userNotifications
          .sort( (a, b) => b.id - a.id  )
          .map( (notify, key) => {
              return (
                <div key={ key + 1 }>
                  <p>{ key + 1 }. { notify.message }</p>
                  <button
                    className='deleteButton'
                    onClick={ () => deleteOldNotification(notify.id) }>
                    x
                  </button>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  exchange: state.exchange
})

const mapDispatchToProps = dispatch => ({
  getUserNotifications: exchange => dispatch( getUserNotifications(exchange) ),
  deleteNotification: exchange => dispatch( deleteNotification(exchange) )
})

export default connect(mapStateToProps,mapDispatchToProps)(ExchangeNotifications)
