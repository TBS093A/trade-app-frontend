import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllThreads, getThreadSubjects } from '../../stores/threads/duck/operations'

import '../../styles/indexForum.scss'

import ForumSubjects from './forumSubjects'

const IndexForum = ({ user, threads, getAllThreads, getThreadSubjects }) => {

  useEffect( () => { getAllThreads() }, [] )

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
                <div
                  className={thread.moderator_privilige === 3 ? 'forumListItem adminDivColor' :
                    (thread.moderator_privilige === 2 ? 'forumListItem moderDivColor' : 'forumListItem') }
                  key={thread.id}
                  onClick={ () => getThreadSubjects(thread) }>
                    <p>{thread.name}</p>
                    <p>moderator: {thread.moderator}</p>
                </div>
              ) }
          </div>
          <div className='forumFoot'>
            Foot
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
  getAllThreads: () => dispatch( getAllThreads() ),
  getThreadSubjects: thread => dispatch( getThreadSubjects(thread) )
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexForum)
