import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getChart, getUserTriggers, getUserNotifications, getUserTransactions, addTrigger } from '../../stores/exchange/duck/operations'

import '../../styles/indexExchange.scss'

const ExchangeTriggerAdd = ({
  user,
  exchange, getChart, getUserTriggers, getUserNotifications,  getUserTransactions, addTrigger,
  triggerValue }) => {

  useEffect( () => { getUserTriggers(user.id) }, [] )

  const [inputValue, setInputValue] = useState( triggerValue )
  const [message, setMessage] = useState('')

  const triggerValueAdd = React.createRef()

  const addNewTrigger = (event) => {
    event.preventDefault()
    if ( triggerValue !== 0 ) {
      let newTrigger = {
        user_id: user.id,
        course_values_for_trigger: triggerValue,
        token: user.token
      }
      addTrigger( newTrigger )
      setMessage('Trigger has been added')
    }
    else
      setMessage('Trigger add error')
  }

  return (
    <div className='exchangeTriggerDiv'>
      <form onSubmit={ addNewTrigger }>
        <p>Trigger value: { triggerValue } zł</p>
        <button>
          Add Trigger
        </button>
      </form>
      <p>{ user.login } triggers:</p>
      <p>{ message }</p>
      <div className='triggerItemList'>
      { exchange.userTriggers
        .sort( (a, b) => b.id - a.id  )
        .map( (trigger, key) => (
        <div key={ key + 1 } className='triggerItem'><p>{ key + 1 }. Value: { trigger.course_values_for_trigger } PLN, Date: { trigger.date_of_trigger }, Status { trigger.status === 1 ? 'Enabled' : 'Disabled' }</p></div>
      ) ) }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  exchange: state.exchange
})

const mapDispatchToProps = dispatch => ({
  getUserTriggers: exchange => dispatch( getUserTriggers(exchange) ),
  addTrigger: exchange => dispatch( addTrigger(exchange) )
})

export default connect(mapStateToProps,mapDispatchToProps)(ExchangeTriggerAdd)
