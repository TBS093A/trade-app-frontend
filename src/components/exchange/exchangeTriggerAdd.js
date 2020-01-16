import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getChart, getUserTriggers, getUserNotifications, getUserTransactions } from '../../stores/exchange/duck/operations'

import '../../styles/indexExchange.scss'

const ExchangeTriggerAdd = ({
  user,
  exchange, getChart, getUserTriggers, getUserNotifications,  getUserTransactions,
  mousePosition }) => {

  useEffect( () => { getUserTriggers(user) }, [] )


  return (
    <div className='exchangeTriggerDativeY'
         style={ { marginTop: mousePosition.y + 'px' } }>

    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  exchange: state.exchange
})

const mapDispatchToProps = dispatch => ({
  getChart: exchange => dispatch( getChart(exchange) ),
  getUserTriggers: exchange => dispatch( getUserTriggers(exchange) ),
  getUserNotifications: exchange => dispatch( getUserNotifications(exchange) ),
  getUserTransactions: exchange => dispatch( getUserTransactions(exchange) )
})

export default connect(mapStateToProps,mapDispatchToProps)(ExchangeTriggerAdd)
