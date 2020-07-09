import React, { useState } from 'react'
import { connect } from 'react-redux'

import { deleteSession } from '../../stores/user/duck/operations'

import actions from '../../stores/movements/duck/actions'

import '../../styles/menuBar.scss'

import BtcLogo from '../../images/BtcLogo.png'

const MenuBar = ({ user, movements, resetMovements, deleteSession }) => {

  const [menuActive, setActivity] = useState(false)

  const userLogout = (event) => {
    event.preventDefault()
    let userToken = {
      token: user.token
    }
    resetMovements()
    deleteSession(userToken)
  }

  if (user.isActive === true) {
    return (
      <div className={ menuActive === true ? 'menuBarActive' : 'menuBar' }>
        <img src={BtcLogo} onClick={ () => setActivity( !menuActive ) } />
        <div>
          <button onClick={ () => resetMovements() }>
            Back to Home
          </button>
          <form onSubmit={userLogout}>
            <button>
              Log out
            </button>
          </form>
          <p>{user.login}</p>
          <p>{user.email}</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={ menuActive === true ? 'menuBarActive' : 'menuBar' }>
        <img src={BtcLogo} onClick={ () => setActivity( !menuActive ) } />
        <div>
          <button onClick={ () => resetMovements() }>
            Back to Home
          </button>
          <p>Welcome Guest!</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  movements: state.movements
})

const mapDispatchToProps = dispatch => ({
  deleteSession: user => dispatch( deleteSession(user) ),
  resetMovements: movements => dispatch( actions.reset() )
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
