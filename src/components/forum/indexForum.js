import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getAllThreads, getThreadSubjects, addThread, deleteThread } from '../../stores/threads/duck/operations'

import '../../styles/indexForum.scss'

import ForumSubjects from './forumSubjects'
import ForumThreadUpdate from './indexForumUpdate'

const IndexForum = ({
  user,
  threads, getAllThreads, getThreadSubjects, addThread, deleteThread }) => {

  useEffect( () => { getAllThreads() }, [] )

  const [formDiv, setFormDiv] = useState(false)
  const [updateFormDiv, setUpdateFormDiv] = useState( { isActive: false, thread_id: -1 } )

  const [titleText, setTitleText] = useState(0)

  const addThreadTitle = React.createRef()

  const addNewThread = (event) => {
    event.preventDefault()
    if ( addThreadTitle.current.value !== '' ) {
      let newThread = {
        name: addThreadTitle.current.value,
        user_id: user.id,
        token: user.token
      }
      addThread(newThread)
      addThreadTitle.current.value = ''
    }
  }

  const deleteOldThread = (thread) => {
    if( user.privilige === 3 ) {
      let delSubject = {
        token: user.token,
        thread_id: thread.id
      }
      deleteThread(delSubject)
    }
  }

  if (threads.isActive === false) {
    return (
      <div>
        <div className='indexForumMarginTop'>
        </div>
        <div className='indexForum'>
          <div className='forumTitle'>
            <p>Forum:</p>
            <p>Threads</p>
            <p>Forum about BTC exchange</p>
          </div>
          <div className='forumItemsList'>
              { threads.threadsList.map( thread =>
                <div>
                  <div
                    className={thread.moderator_privilige === 3 ? 'forumListItem adminDivColor' :
                      (thread.moderator_privilige === 2 ? 'forumListItem moderDivColor' : 'forumListItem') }
                    key={thread.id}>
                      <p onClick={ () => getThreadSubjects(thread) }>{thread.name}</p>
                      { (user.id === thread.user_id ||
                         user.privilige === 3) ? (
                          <div>
                            <button onClick={ () => setUpdateFormDiv( { isActive: !updateFormDiv.isActive, thread_id: thread.id } )}>
                              { updateFormDiv.isActive ? 'Close Edit' : 'Edit Thread' }
                            </button>
                            { user.privilige === 3 ? (
                                <button onClick={ () => deleteOldThread( thread )}>
                                  Delete Thread
                                </button>
                              ) : (
                                <div></div>
                            ) }
                            <img src={ thread.moderator_avatar } />
                            <p>{ thread.moderator }</p>
                          </div>
                        ) : (
                          <div>
                            <img src={ thread.moderator_avatar } />
                            <p>{ thread.moderator }</p>
                          </div>
                        )
                      }
                  </div>
                  <ForumThreadUpdate thread={ thread } thisThread={ updateFormDiv }/>
                </div>
              ) }
          </div>
          <div className={ formDiv === true ? 'forumFormSubject' : 'forumHiddenDiv' }>
            <form onSubmit={ addNewThread }>
              <input
                name='addThreadTitle'
                placeholder='Write a thread title'
                maxLength='30'
                ref={ addThreadTitle }
                onChange={ e => setTitleText(e.target.value.length) }>
              </input>
              <p>Title: {titleText}/30</p>
              <button>
                Add Thread
              </button>
            </form>
          </div>
          <div className='forumFoot'>
            { user.privilige === 3 ? (
              <button onClick={ () => setFormDiv( !formDiv ) }>
                { formDiv === true ? 'Close Add Thread' : 'Add Thread' }
              </button>
            ) : (
              <div></div>
            ) }
          </div>
        </div>
        <div className='indexForumMarginTop'>
        </div>
      </div>
    )
  }
  else if (threads.isActive === true) {
    return (
      <div>
        <div className='indexForumMarginTop'>
        </div>
        <div className='indexForum'>
          <ForumSubjects />
        </div>
        <div className='indexForumMarginTop'>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  threads: state.threads
})

const mapDispatchToProps = dispatch => ({
  addThread: threads => dispatch( addThread(threads) ),
  deleteThread: threads => dispatch( deleteThread(threads) ),
  getAllThreads: () => dispatch( getAllThreads() ),
  getThreadSubjects: threads => dispatch( getThreadSubjects(threads) )
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexForum)
