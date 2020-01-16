import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getChart, getTriggers, getNotifications, getTransactions } from '../../stores/exchange/duck/operations'

import '../../styles/indexExchange.scss'

const IndexExchange = ({
  user,
  exchange, getChart, getTriggers, getNotifications,  getTransactions }) => {

  useEffect( () => { getChart() }, [] )

  const [candleInfo, setCandleInfo] = useState( { Open: 0, Close: 0, Min: 0, Max: 0, Vol: 0 } )

  const colorGreen = {
    background: 'green',
  }

  const colorRed = {
    background: 'red',
  }

  const getCandleInformation = (candle) => {
    setCandleInfo( {
       Open: candle.Open,
       Close: candle.Close,
       Min: candle.Min,
       Max: candle.Max,
       Vol: candle.Volume,
       Date: candle.Date
     }
   )
  }

  return (
    <div className='indexExchange'>
      <div className={ user.id > -1 ? 'exchangeChartUser' : 'exchangeChartGuest' }>
        <div className='chart' style={ { width: exchange.candles.candlesCount * 15 + 'px' } }>
          { exchange.candles.candles.map( (candle, key) => {

                const color = candle.Open > candle.Close ? colorRed.background : colorGreen.background

                let highValue = candle.Open > candle.Close ? candle.Open : candle.Close
                let lowValue = candle.Open < candle.Close ? candle.Open : candle.Close
                let difference = highValue - lowValue

                let chartScaleY = (exchange.candles.graphMax - candle.Max) / 8

                if ( difference > 0 && difference < 10 )
                  difference *= 2
                else if ( difference > 50 && difference < 100 )
                  difference /= 2
                else if ( difference >= 100 && difference <= 200 )
                  difference /= 3
                else if ( difference > 200 )
                  difference = difference % 100

                return (
                  <div
                    key={ key }
                    className='sectionChart'
                    onMouseOver={ () => getCandleInformation(candle) }>

                    <div className='sectionCandle'>
                      <div
                        className='candle'
                        style={ { paddingTop: chartScaleY + 'px' } }
                        >
                        <div
                          className='candleMaxValue'
                          style={ { height: parseInt( (candle.Max - highValue ) / 2 ) + 'px',
                                    background: color }
                        }>
                        </div>
                        <div
                          className='candleHigh'
                          style={
                            { height: parseInt( difference ) + 'px',
                              background: color }
                        }>
                        </div>
                        <div
                          className='candleLow'
                          style={ { height: parseInt( difference ) + 'px',
                                    background: color }
                        }>
                        </div>
                        <div
                          className='candleMinValue'
                          style={ { height: parseInt( ( lowValue - candle.Min ) / 2 ) + 'px',
                                    background: color }
                        }>
                        </div>
                      </div>
                    </div>

                    <div className='sectionVolumen'>
                      <div className='volumen'
                      style={ { height: candle.Volume + 'px' } }>
                      </div>
                    </div>

                  </div>
                )
              }
            )
          }
        </div>
      </div>
      <div className={ user.id > -1 ? 'exchangeInterface' : 'emptySpaceExchange' }>
        <div>
          <p>Open: { candleInfo.Open }, Close: { candleInfo.Close }</p>
          <p>Max: { candleInfo.Max }, Min: { candleInfo.Min }</p>
          <p>Volume: { candleInfo.Vol }</p>
          <p>Date: { candleInfo.Date }</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  exchange: state.exchange
})

const mapDispatchToProps = dispatch => ({
  getChart: exchange => dispatch( getChart(exchange) ),
  getTriggers: exchange => dispatch( getTriggers(exchange) ),
  getNotifications: exchange => dispatch( getNotifications(exchange) ),
  getTransactions: exchange => dispatch( getTransactions(exchange) )
})

export default connect(mapStateToProps,mapDispatchToProps)(IndexExchange)
