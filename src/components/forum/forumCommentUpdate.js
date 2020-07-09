import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getCommentRatings, updateComment } from '../../stores/comments/duck/operations'
import { refreshSubjectComments } from '../../stores/subjects/duck/operations'

import actions from '../../stores/subjects/duck/actions'

import '../../styles/indexForum.scss'

const ForumCommentUpdate = ({
  user,
  subjects, refreshSubjectComments, deactivate,
  comment, comments, updateComment, getCommentRatings,
  thisComment }) => {

  const updateCommentTextArea = React.createRef()

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  let subjectLoad = {
    id: subjects.actualSubjectID
  }

  const updateOldComment = async (event) => {
    event.preventDefault()
    if ( updateCommentTextArea.current.value !== '' ) {
      let commentData = {
        id: comment.id,
        token: user.token,
        text: updateCommentTextArea.current.value
      }
      updateCommentTextArea.current.value = ''
      await updateComment(commentData)
      await sleep(100)
      await refreshSubjectComments(subjectLoad)
    }
  }

  const [commentText, setCommentText] = useState(0)

  if ( thisComment.isActive === true && thisComment.comment_id === comment.id) {
    return (
      <div className='forumFormComment'>
        <form onSubmit={ updateOldComment }>
          <textarea
            name='addCommentText'
            placeholder={ comment.text }
            ref={ updateCommentTextArea }
            cols='150'
            maxLength='1000'
            onChange={ e => setCommentText( e.target.value.length ) }>
          </textarea>
          <p>{commentText}/1000</p>
          <button>
            Update Comment
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
  subjects: state.subjects,
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  updateComment: comments => dispatch( updateComment(comments) ),
  getCommentRatings: comments => dispatch( getCommentRatings(comments) ),
  refreshSubjectComments: subjects => dispatch( refreshSubjectComments(subjects) ),

  deactivate: () => dispatch( actions.deactivate() )
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumCommentUpdate)
