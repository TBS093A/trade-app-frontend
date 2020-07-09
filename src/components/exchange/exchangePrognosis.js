import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { checkPrognosis } from '../../stores/exchange/duck/operations'

import '../../styles/indexExchange.scss'

const ExchangePrognosis = ({
  user,
  exchange, checkPrognosis }) => {

  const inputPrognosis = React.createRef()

  const checkNewPrognosis = () => {
    if ( inputPrognosis.current.value > 0 ) {
      let prognosis = {
        price: inputPrognosis.current.value,
      }
      checkPrognosis( prognosis )
    }
  }

  return (
    <div className='exchangePrognosisDiv'>
      <input
        placeholder='Write the amount to exchange forecast'
        onChange={ () => checkNewPrognosis() }
        ref={ inputPrognosis }>
      </input>
      <p>Forecast: { Number((exchange.prognosis.price_forecast).toFixed(2)) } PLN</p>
      <p>Percent: { Number((exchange.prognosis.percent_of_difference).toFixed(3)) } %</p>
      <p>Course on payment: { exchange.prognosis.course_on_payment } PLN</p>
      <p>AVG: { Number((exchange.prognosis.svg_of_all).toFixed(2)) }</p>
      <p>Date: { exchange.prognosis.date_of_transaction }</p>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  exchange: state.exchange
})

const mapDispatchToProps = dispatch => ({
  checkPrognosis: exchange => dispatch( checkPrognosis(exchange) )
})

export default connect(mapStateToProps,mapDispatchToProps)(ExchangePrognosis)
