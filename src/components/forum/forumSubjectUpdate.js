import React, { useState } from 'react'
import { connect } from 'react-redux'

import { refreshThreadSubjects } from '../../stores/threads/duck/operations'
import { getSubjectComments, updateSubject } from '../../stores/subjects/duck/operations'

import '../../styles/indexForum.scss'

const ForumSubjectUpdate = ({
  user,
  threads, deactivate,
  subjects, updateSubject, getSubjectComments,
  subject, thisSubject }) => {

  const [formDiv, setFormDiv] = useState(false)

  const updateSubjectTitle = React.createRef()
  const updateSubjectAuthor = React.createRef()

<<<<<<< HEAD
  const updateOldSubject = (event) => {
    event.preventDefault()
    if ( updateSubjectTitle.current.value !== '') {
      let putSubject = {
        id: subject.id,
        name: updateSubjectTitle.current.value,
        user_id: user.id,
        thread_id: threads.actualThreadID,
=======
  const [selectAuthorID, setSelectAuthorID] = useState(-1)
  const [selectThreadID, setSelectThreadID] = useState(-1)

  const updateOldSubject = (event) => {
    event.preventDefault()
    if ( updateSubjectTitle.current.value !== '' && selectAuthorID === -1 && selectThreadID === -1 ) {
      let putSubject = {
        id: subject.id,
        name: updateSubjectTitle.current.value,
        user_id: subject.user_id,
        thread_id: subject.thread_id,
        token: user.token
      }
      updateSubject(putSubject)
      updateSubjectTitle.current.value = ''
    } else if ( updateSubjectTitle.current.value !== '' && user.privilige >= 2 ) {
      let putSubject = {
        id: subject.id,
        name: updateSubjectTitle.current.value,
        user_id: selectAuthorID === -1 ? subject.user_id : selectAuthorID,
        thread_id: selectThreadID === -1 ? subject.thread_id : selectThreadID,
>>>>>>> front
        token: user.token
      }
      updateSubject(putSubject)
      updateSubjectTitle.current.value = ''
    }
  }

  const [subjectTitleText, setSubjectTitleText] = useState(0)
  const [titleText, setTitleText] = useState(0)

  if ( thisSubject.isActive === true && thisSubject.subject_id === subject.id) {
    return (
      <div className='forumFormSubject'>
        <form onSubmit={ updateOldSubject }>
          <input
            name='updateSubjectTitleText'
            placeholder={ subject.name }
            ref={ updateSubjectTitle }
            cols='150'
            maxLength='30'
            onChange={ e => setSubjectTitleText( e.target.value.length ) }>
          </input>
          { (user.privilige >= 2) ? (
            <div>
              <select
                name='updateSubjectAuthorText'
<<<<<<< HEAD
                value={ user.allUsersList }
                ref={ updateSubjectAuthor }>
=======
                onChange={ e => setSelectAuthorID( e.target.value ) }>
                  <option value={ subject.user_id }>Choice Author ( actual: { subject.author } )</option>
>>>>>>> front
                { user.allUsersList.map( userObject =>
                    <option value={userObject.id}>{userObject.login}, Privilige: { userObject.privilige >= 2 ? 'Moderator' : 'Normal User' }</option>
                  )
                }
              </select>
              <select
                name='updateSubjectAuthorText'
<<<<<<< HEAD
                value={ threads.threadsList }>
=======
                onChange={ e => setSelectThreadID( e.target.value ) }>
                  <option value={ threads.actualThreadID }>Choice Thread ( actual: { threads.actualThreadName } )</option>
>>>>>>> front
                { threads.threadsList.map( threadObject =>
                    <option value={threadObject.id}>{threadObject.name}, moderator: {threadObject.moderator}</option>
                  )
                }
              </select>
            </div>
          ) : (
              <div></div>
            )
          }
          <p>{subjectTitleText}/30</p>
          <button>
            Update Subject
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
  threads: state.threads,
  subjects: state.subjects,
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  refreshThreadSubjects: threads => dispatch( refreshThreadSubjects(threads) ),
  getSubjectComments: subjects => dispatch( getSubjectComments(subjects) ),
  updateSubject: subjects => dispatch( updateSubject(subjects) )
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumSubjectUpdate)
