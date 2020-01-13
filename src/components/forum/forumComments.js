import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getCommentRatings, addComment, deleteComment } from '../../stores/comments/duck/operations'
import { refreshSubjectComments } from '../../stores/subjects/duck/operations'

import actions from '../../stores/subjects/duck/actions'

import '../../styles/indexForum.scss'

import ForumRatings from './forumRatings'
import ForumCommentUpdate from './forumCommentUpdate'

const ForumComments = ({
  user,
  subjects, refreshSubjectComments, deactivate,
  comments, addComment, deleteComment, getCommentRatings }) => {

  useEffect( () => { getCommentRatings(subjects.commentsList) }, [])

  const [updateFormDiv, setUpdateFormDiv] = useState( { isActive: false, comment_id: -1 } )
  const [formDiv, setFormDiv] = useState(false)

  const addCommentTextArea = React.createRef()
  const updateCommentTextArea = React.createRef()

  const addNewComment = (event) => {
    event.preventDefault()
    if ( addCommentTextArea.current.value !== '' ) {
      let newComment = {
        text: addCommentTextArea.current.value,
        subject_id: subjects.actualSubjectID,
        user_id: user.id,
        token: user.token
      }
      addCommentTextArea.current.value = ''
      addComment(newComment)
      setFormDiv( !formDiv )
      let actualSubject = {
        id: subjects.actualSubjectID
      }
      refreshSubjectComments(actualSubject)
    }
  }

  const deleteOldComment = (commentID) => {
    let delComment = {
      id: commentID,
      token: user.token
    }
    deleteComment(delComment)
    let actualSubject = {
      id: subjects.actualSubjectID
    }
    refreshSubjectComments(actualSubject)
  }

  const [commentText, setCommentText] = useState(0)

  return (
    <div>
      <div className='forumTitle'>
        <p>Subject:</p>
        <p>{subjects.actualSubjectName}</p>
        <button onClick={ () => deactivate() }>
          Back to subjects
        </button>
        <p>author {subjects.actualSubjectAuthor}</p>
      </div>
      <div className='forumItemsList'>
          { subjects.commentsList.map( comment =>
            <div>
              <div
                className={comment.author_privilige === 3 ? 'forumListComment adminDivColor' :
                  (comment.author_privilige === 2 ? 'forumListComment moderDivColor' : 'forumListComment') }
                key={comment.id}>
                <div className='commentAvatar'>
                  <img src={comment.author_avatar} />
                  <p>{comment.author}</p>
                  { ( user.id === comment.user_id || user.privilige > 1 ) ? (
                    <div>
                      <button onClick={ () => setUpdateFormDiv( { isActive: !updateFormDiv.isActive, comment_id: comment.id } ) }>
                        { updateFormDiv.isActive ? 'Close Edit' : 'Edit Comment'}
                      </button>
                      { subjects.commentsList[0].id === comment.id ?
                        (
                          <div></div>
                        ) : (
                          <button onClick={ () =>  deleteOldComment(comment.id) }>
                            Delete Comment
                          </button>
                      ) }
                    </div>
                  ) : (
                    <div></div>
                  ) }
                </div>
                <div className='commentText'>
                  <p>{comment.text}</p>
                </div>
                <div className='commentRating'>
                  <ForumRatings comment={comment} />
                </div>
              </div>
              <ForumCommentUpdate comment={comment} thisComment={updateFormDiv} />
            </div>
          ) }
      </div>
      <div className={ formDiv === true ? 'forumFormComment' : 'forumHiddenDiv' }>
        <form onSubmit={ addNewComment }>
          <textarea
            name='addCommentText'
            placeholder='Write a comment'
            ref={addCommentTextArea}
            cols='150'
            maxLength='1000'
            onChange={ e => setCommentText( e.target.value.length )}>
          </textarea>
          <p>{commentText}/1000</p>
          <button>
            Add Comment
          </button>
        </form>
      </div>
      <div className='forumFoot'>
        <button onClick={ () => setFormDiv( !formDiv ) }>
          { formDiv === true ? 'Close Add Comment' : 'Add Comment' }
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  subjects: state.subjects,
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  addComment: comments => dispatch( addComment(comments) ),
  deleteComment: comments => dispatch( deleteComment(comments) ),
  getCommentRatings: comments => dispatch( getCommentRatings(comments) ),
  refreshSubjectComments: subjects => dispatch( refreshSubjectComments(subjects) ),

  deactivate: () => dispatch( actions.deactivate() )
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumComments)
