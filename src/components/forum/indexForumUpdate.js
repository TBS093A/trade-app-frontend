import React, { useState } from 'react'
import { connect } from 'react-redux'

import { updateThread } from '../../stores/threads/duck/operations'

import '../../styles/indexForum.scss'

const IndexForumUpdate = ({
  user,
  threads, getAllThreads, getThreadSubjects, updateThread,
  thread, thisThread }) => {

  const updateThreadTitle = React.createRef()
  const [threadTitleText, setThreadTitleText] = useState(0)

  const [selectThreadModeratorID, setSelectThreadModeratorID] = useState(-1)

  const updateOldThread = (event) => {
    event.preventDefault()
    if ( updateThreadTitle.current.value !== '' && selectThreadModeratorID === -1 && user.privilige >= 2) {
      let putThread = {
        id: thread.id,
        name: updateThreadTitle.current.value,
        user_id: thread.user_id,
        token: user.token
      }
      updateThread(putThread)
      updateThreadTitle.current.value = ''
    } else if ( updateThreadTitle.current.value !== '' && user.privilige === 3 ) {
      let putThread = {
        id: thread.id,
        name: updateThreadTitle.current.value,
        user_id: selectThreadModeratorID === -1 ? thread.user_id : selectThreadModeratorID,
        token: user.token
      }
      updateThread(putThread)
      updateThreadTitle.current.value = ''
    }
  }

  if ( thisThread.isActive === true && thisThread.thread_id === thread.id ) {
    return (
      <div className='forumFormSubject'>
        <form onSubmit={ updateOldThread }>
          <input
            name='updateThreadTitleText'
            placeholder={ thread.name }
            ref={ updateThreadTitle }
            cols='150'
            maxLength='30'
            onChange={ e => setThreadTitleText( e.target.value.length ) }>
          </input>
          { (user.privilige === 3) ? (
            <div>
              <select
                name='updateThreadModerator'
                onChange={ e => setSelectThreadModeratorID( e.target.value ) }>
                  <option value={ thread.user_id }>Choice Moderator ( actual: { thread.moderator } )</option>
                { user.allUsersList
                  .filter( userObject => userObject.privilige >= 2 )
                  .map( userObject =>
                    <option value={userObject.id}>{userObject.login}</option>
                  )
                }
              </select>
            </div>
          ) : (
              <div></div>
            )
          }
          <p>{threadTitleText}/30</p>
          <button>
            Update thread
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div className='forumHiddenDiv'>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  threads: state.threads
})

const mapDispatchToProps = dispatch => ({
  updateThread: threads => dispatch( updateThread(threads) )
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexForumUpdate)
