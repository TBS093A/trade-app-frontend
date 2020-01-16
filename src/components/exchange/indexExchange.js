import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getChart, getUserTriggers, getUserNotifications, getUserTransactions } from '../../stores/exchange/duck/operations'

import ExchangeTriggerAdd from './exchangeTriggerAdd'

import '../../styles/indexExchange.scss'

const IndexExchange = ({
  user,
  exchange, getChart, getUserTriggers, getUserNotifications,  getUserTransactions }) => {

  useEffect( () => { getChart() }, [] )
  useEffect( () => { getUserTriggers() }, [] )

  const [candleInfo, setCandleInfo] = useState( { Open: 0, Close: 0, Min: 0, Max: 0, Vol: 0 } )

  const [mousePosition, setMousePosition] = useState( { x: 0, y: 0 } )

  const colorGreen = {
    background: 'green'//'rgba(0,93,0,1)',
  }

  const colorRed = {
    background: 'red'//'rgba(136,15,15,1)',
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

 let pixelScale = ( exchange.candles.graphMax - exchange.candles.graphMin ) / 590

 const getMousePosition = (event) => {
   setMousePosition( { x: event.pageX, y: event.pageY } )
 }


  return (
    <div className='indexExchange'>
      <div className={ user.id > -1 ? 'exchangeChartUser' : 'exchangeChartGuest' }>
        <div className='chart'
             onMouseOver={ event => getMousePosition(event) }
             style={ { width: exchange.candles.candlesCount * 15 + 'px' } }>
          { user.id > -1 ? (
            <div>
              <div className='exchangeTriggerDativeY'
                  style={ { transform: 'translateY(' + (mousePosition.y - 175) + 'px)' } }>
                  <p>{ ( exchange.candles.graphMax - ( pixelScale * ( mousePosition.y - 175 ) ) ) }</p>
              </div>
              <div className='exchangeTriggerDativeX'
                   style={ { transform: 'translateX(' + (mousePosition.x) + 'px)' } }>
              </div>
            </div>
          ) : (
            <div></div>
          ) }
          { exchange.candles.candles.map( (candle, key) => {

                const color = candle.Open > candle.Close ? colorRed.background : colorGreen.background

                let highValue = candle.Open > candle.Close ? candle.Open : candle.Close
                let lowValue = candle.Open < candle.Close ? candle.Open : candle.Close

                let scaleProperties = 8

                let chartScaleY = (exchange.candles.graphMax - candle.Max) / scaleProperties

                let onePercentScaleY = 100 / chartScaleY
                let difference = (( highValue - lowValue ) / onePercentScaleY ) / scaleProperties

                if ( parseInt(difference) === 0 )
                  difference = 1

                return (
                  <div
                    key={ key }
                    className='sectionChart'
                    onMouseOver={ () => getCandleInformation(candle) }>

                    <div className='sectionCandle'>
                      <div
                        className='candle'
                        style={ { paddingTop: chartScaleY + 'px' } }>
                        <div
                          className='candleMaxValue'
                          style={ { height: parseInt( (candle.Max - highValue ) / scaleProperties ) + 'px', background: color }}>
                        </div>
                        <div
                          className='candleHigh'
                          style={{ height: parseInt( difference ) + 'px', background: color }}>
                        </div>
                        <div
                          className='candleLow'
                          style={{ height: parseInt( difference ) + 'px', background: color }}>
                        </div>
                        <div
                          className='candleMinValue'
                          style={ { height: parseInt( ( lowValue - candle.Min ) / scaleProperties ) + 'px', background: color }}>
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
      <div className={ user.id > -1 ? 'exchangeInterface' : 'exchangeEmptySpace' }>
        <div className='candleInformation'>
          <p>Open: { candleInfo.Open },</p>
          <p>Close: { candleInfo.Close },</p>
          <p>Max: { candleInfo.Max },</p>
          <p>Min: { candleInfo.Min },</p>
          <p>Volume: { candleInfo.Vol },</p>
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
  getUserTriggers: exchange => dispatch( getUserTriggers(exchange) ),
  getUserNotifications: exchange => dispatch( getUserNotifications(exchange) ),
  getUserTransactions: exchange => dispatch( getUserTransactions(exchange) )
})

export default connect(mapStateToProps,mapDispatchToProps)(IndexExchange)
