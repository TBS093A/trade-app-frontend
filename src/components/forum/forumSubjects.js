import React, { useState } from 'react'
import { connect } from 'react-redux'

import { refreshThreadSubjects } from '../../stores/threads/duck/operations'
import { getSubjectComments, addSubject } from '../../stores/subjects/duck/operations'
import { addComment } from '../../stores/comments/duck/operations'
import actions from '../../stores/threads/duck/actions'

import '../../styles/indexForum.scss'

import ForumComments from './forumComments'

const ForumSubjects = ({
  user,
  threads, deactivate,
  subjects, addSubject, getSubjectComments,
  comments, addComment }) => {

  const [formDiv, setFormDiv] = useState(false)

  const addSubjectTitle = React.createRef()
  const addSubjectComment = React.createRef()

  const addNewSubject = (event) => {
    event.preventDefault()
    if ( addSubjectTitle.current.value !== '' && addSubjectComment.current.value !== '' ) {
      let newSubject = {
        name: addSubjectTitle.current.value,
        user_id: user.id,
        thread_id: threads.actualThreadID,
        comment: {
          text: addSubjectComment.current.value,
          user_id: user.id,
          token: user.token
        },
        token: user.token
      }
      addSubject(newSubject)
      addSubjectComment.current.value = ''
      addSubjectTitle.current.value = ''
    }
  }

  const [commentText, setCommentText] = useState(0)
  const [titleText, setTitleText] = useState(0)

  if (threads.isActive === true && subjects.isActive === false) {
    return (
      <div>
        <div className='forumTitle'>
          <p>Subjects in thread:</p>
          <p>{threads.actualThreadName} </p>
          <button onClick={ () => deactivate() }>
            Back to Threads
          </button>
          <p>moderator {threads.actualThreadModerator}</p>
        </div>
        <div className='forumItemsList'>
            { threads.subjectsList.map( subject =>
              <div
                className={subject.author_privilige === 3 ? 'forumListItem adminDivColor' :
                  (subject.author_privilige === 2 ? 'forumListItem moderDivColor' : 'forumListItem') }
                key={subject.id}>
                  <p onClick={ () => getSubjectComments(subject) }>
                    {subject.name}
                  </p>
                  <div></div>
                    { (user.id === subject.user_id ||
                       user.id === threads.actualThreadModeratorID ||
                       user.privilige === 3) ? (
                        <div>
                          <button>
                            Edit Title
                          </button>
                          <button>
                            Delete Subject
                          </button>
                          <img src={subject.author_avatar} />
                          <p>{subject.author}</p>
                        </div>
                      ) : (
                        <div>
                          <img src={subject.author_avatar} />
                          <p>{subject.author}</p>
                        </div>
                      )
                    }
              </div>
            ) }
        </div>
        <div className={ formDiv === true ? 'forumFormSubject' : 'forumHiddenDiv' }>
          <form onSubmit={addNewSubject}>
            <input
              name='addSubjectTitle'
              placeholder='Write a subject title'
              ref={addSubjectTitle}
              maxLength='30'
              onChange={ e => setTitleText(e.target.value.length) }>
            </input>
            <textarea
              name='addCommentText'
              placeholder='Write a first comment'
              cols='150'
              ref={addSubjectComment}
              maxLength='1000'
              onChange={ e => setCommentText(e.target.value.length) }>
            </textarea>
            <p>Title: {titleText}/30</p>
            <p>Comment: {commentText}/1000</p>
            <button>
              Add Subject
            </button>
          </form>
        </div>
        <div className='forumFoot'>
        <button onClick={ () => setFormDiv( !formDiv ) }>
          { formDiv === true ? 'Close Add Subject' : 'Add Subject' }
        </button>
        </div>
      </div>
    )
  }
  else if (threads.isActive === true && subjects.isActive === true) {
    return (
      <div>
          <ForumComments />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  threads: state.threads,
  subjects: state.subjects,
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  refreshThreadSubjects: threads => dispatch( refreshThreadSubjects(threads) ),
  getSubjectComments: subjects => dispatch( getSubjectComments(subjects) ),
  addSubject: subjects => dispatch( addSubject(subjects) ),
  addComment: comments => dispatch( addComment(comments) ),

  deactivate: () => dispatch( actions.deactivate() )
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumSubjects)
