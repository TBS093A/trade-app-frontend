import React from 'react'
import { connect } from 'react-redux'

// Operations Redux

import { createSession, deleteSession, updateSession, registerUser } from '../stores/user/duck/operations'

// Actions Redux

import actions from '../stores/movements/duck/actions'

// Styles

import '../styles/index.scss'

// Components

import MenuBar from './menuBar/menuBar'

import Exchange from './exchange/indexExchange'
import Forum from './forum/indexForum'
import AdminPanel from './admin/adminPanel'

// Images / Videos

import VideoEx from '../images/stockExchange.mp4'
import BtcLogo from '../images/BtcLogo.png'
import ForumLogo from '../images/ForumLogo.png'

const IndexInterface = ({
  user, movements,
  createSession, deleteSession, updateSession, registerUser,
  setRegister, setEdit, setForum, setExchange, setAdminPanel, resetMovements}) => {

  const loginInput = React.createRef()
  const passwordInput = React.createRef()

  const userLogin = (event) => {
    event.preventDefault()
    let userInput = {
      login: loginInput.current.value,
      password: passwordInput.current.value
    }
    loginInput.current.value = ''
    passwordInput.current.value = ''
    createSession(userInput)
  }

  const userLogout = (event) => {
    event.preventDefault()
    let userToken = {
      token: user.token
    }
    deleteSession(userToken)
  }

  const loginRegister = React.createRef()
  const passOneRegister = React.createRef()
  const passTwoRegister = React.createRef()
  const emailRegister = React.createRef()

  const userRegister = (event) => {
    event.preventDefault()
    if (passOneRegister.current.value === passTwoRegister.current.value) {
      let userRegister = {
        login: loginRegister.current.value,
        password: passOneRegister.current.value,
        email: emailRegister.current.value
      }
      registerUser(userRegister)
    }
    loginRegister.current.value = ''
    passOneRegister.current.value = ''
    passTwoRegister.current.value = ''
    emailRegister.current.value = ''
  }

  const loginUpdate = React.createRef()
  const passOldOneUpdate = React.createRef()
  const passOldTwoUpdate = React.createRef()
  const passNewUpdate = React.createRef()
  const emailUpdate = React.createRef()
  const avatarUpdate = React.createRef()

  const userUpdate = (event) => {
    event.preventDefault()
    if ( passOldOneUpdate.current.value === passOldTwoUpdate.current.value ) {
      let userUpdate = {
        id: user.id,
        login: loginUpdate.current.value === '' ? user.login : loginUpdate.current.value,
        passwordOld: passOldOneUpdate.current.value,
        passwordNew: passNewUpdate.current.value === '' ? passOldOneUpdate.current.value : passNewUpdate.current.value,
        email: emailUpdate.current.value === '' ? user.email : emailUpdate.current.value,
        avatar: avatarUpdate.current.value === '' ? user.avatar : avatarUpdate.current.value,
        token: user.token
      }
      updateSession(userUpdate)
    }
    loginUpdate.current.value = ''
    passOldOneUpdate.current.value = ''
    passOldTwoUpdate.current.value = ''
    passNewUpdate.current.value = ''
    emailUpdate.current.value = ''
    avatarUpdate.current.value = ''
  }

  if (user.isActive === false && movements.register === false && movements.exchange === false){
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video>
        <div className="interface">
          <div className='exchangeBtt' onClick={ () => setExchange() }>
            <img src={BtcLogo} />
          </div>
          <div className='emptySpace'>
          </div>
          <div className='loginForm'>
            <form onSubmit={userLogin}>
              <input type='text' placeholder='Account' ref={loginInput}/>
              <input type='password' placeholder='Password' ref={passwordInput}/>
              <br /><br />
              <button>
                Log in
              </button>
            </form>
            <form>
              <button onClick={ () => setRegister() }>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  else if (movements.register === true) {
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video>
        <div className="interface">
          <div className='oneDivForm'>
            <form onSubmit={userRegister}>
              <input type='text' placeholder='Login' ref={loginRegister} />
              <input type='password' placeholder='Password' ref={passOneRegister}/>
              <input type='password' placeholder='Replace Password' ref={passTwoRegister}/>
              <input type='text' placeholder='E-mail' ref={emailRegister}/>
              <br /><br />
              <button>
                Register
              </button>
            </form>
            <button onClick={ () => resetMovements() }>
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }
  else if (movements.edit === true) {
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video>
        <div className="interface">
          <div className='oneDivForm'>
            <form onSubmit={userUpdate}>
              Login:
              <input type='text' placeholder={user.login} ref={loginUpdate}/>
              Old Password
              <input type='password' placeholder='Password' ref={passOldOneUpdate}/>
              <input type='password' placeholder='Replace Password' ref={passOldTwoUpdate}/>
              New Password
              <input type='password' placeholder='New Password' ref={passNewUpdate}/>
              E-mail:
              <input type='text' placeholder={user.email} ref={emailUpdate}/>
              Avatar URL:
              <input type='text' placeholder={user.avatar} ref={avatarUpdate}/>
              <br /><br />
              <button>
                Update
              </button>
            </form>
            <button onClick={ () => resetMovements() }>
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }
  else if (movements.exchange === true) {
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video>
        <div>
          <MenuBar />
          <Exchange />
        </div>
      </div>
    )
  }
  else if (movements.forum === true) {
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video>
        <div>
          <MenuBar />
          <Forum />
        </div>
      </div>
    )
  }
  else if (movements.adminPanel === true) {
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video >
        <div>
          <MenuBar />
          <AdminPanel />
        </div>
      </div>
    )
  }
  else if (user.privilige === 3) {
      return (
        <div className='indexView'>
          <video id='indexVideo' autoPlay muted loop>
            <source src={VideoEx} type="video/mp4" />
          </video>
          <div className="interface">
            <div className='exchangeBtt' onClick={ () => setExchange() }>
              <img src={BtcLogo} />
            </div>
            <div className='forumBtt' onClick={ () => setForum() }>
              <img src={ForumLogo} />
            </div>
            <div className='loginForm'>
              <form>
                <p>Welcome</p>
                <p>{user.login}</p>
                <br />
              </form>
              <button onClick={ () => setAdminPanel() }>
                Admin Panel
              </button>
              <button onClick={ () => setEdit() }>
                Edit Account
              </button>
              <form onSubmit={userLogout}>
                <button>
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      )
  }
  else {
    return (
      <div className='indexView'>
        <video id='indexVideo' autoPlay muted loop>
          <source src={VideoEx} type="video/mp4" />
        </video>
        <div className="interface">
          <div className='exchangeBtt' onClick={ () => setExchange() }>
            <img src={BtcLogo} />
          </div>
          <div className='forumBtt' onClick={ () => setForum() }>
            <img src={ForumLogo} />
          </div>
          <div className='loginForm'>
            <form>
              <p>Welcome</p>
              <p>{user.login}</p>
              <br />
            </form>
            <button onClick={ () => setEdit()}>
              Edit Account
            </button>
            <form onSubmit={userLogout}>
              <button>
                Log out
              </button>
            </form>
          </div>
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
  createSession: user => dispatch( createSession(user) ),
  deleteSession: user => dispatch( deleteSession(user) ),
  updateSession: user => dispatch( updateSession(user) ),
  registerUser: user => dispatch( registerUser(user) ),

  setRegister: movements => dispatch( actions.register() ),
  setEdit: movements => dispatch( actions.editAccount() ),
  setExchange: movements => dispatch( actions.exchange() ),
  setForum: movements => dispatch( actions.forum() ),
  setAdminPanel: movements => dispatch( actions.adminPanel() ),
  resetMovements: movements => dispatch( actions.reset() )
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexInterface)
