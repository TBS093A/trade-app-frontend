import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getCommentRatings, addRatingComment, updateRatingComment } from '../../stores/comments/duck/operations'
import actions from '../../stores/subjects/duck/actions'

import '../../styles/forumRatings.scss'

const ForumRatings = ({
  user, subjects, deactivate,
  comments, getCommentRatings,
  addRatingComment, updateRatingComment,
  comment }) => {

  useEffect( () => { getCommentRatings(subjects.commentsList) }, [])

  let commentRatingsAvg = (commentID) => {
    for (let comment in Object.entries(subjects.commentsList)) {
      if (commentID === subjects.commentsList[comment].id)
        return parseInt(subjects.commentsList[comment].ratings_avg.value__avg)
    }
  }

  let getUserRating = (commentID) => {
    let userRating = 0
    for (let comment = 0; comment < comments.ratingsCommentList.length; comment++)
      for (let rating = 0; rating < comments.ratingsCommentList[comment].length; rating++) {
        if ((+comments.ratingsCommentList[comment][rating].user_id) === (+user.id)) {
          if ((+comments.ratingsCommentList[comment][rating].comment_id) === (+commentID)) {
            userRating = comments.ratingsCommentList[comment][rating].value
            return userRating
          }
        }
      }
    return 0
  }

  let getRatingID = (commentID) => {
    let userRatingID = 0
    for (let comment = 0; comment < comments.ratingsCommentList.length; comment++)
      for (let rating = 0; rating < comments.ratingsCommentList[comment].length; rating++) {
        if ((+comments.ratingsCommentList[comment][rating].user_id) === (+user.id)) {
          if ((+comments.ratingsCommentList[comment][rating].comment_id) === (+commentID)) {
            userRatingID = comments.ratingsCommentList[comment][rating].id
            return userRatingID
          }
        }
      }
    return -1
  }

  const [newRatingValue, setValue] = useState(0)

  const changeRatingValue = (event, commentID) => {

    let ratingDiv = document.getElementById('rate' + commentID)
    let divYPositionOnPage = ratingDiv.getBoundingClientRect().top + 72
    let yPosition = event.screenY - divYPositionOnPage

    if ( yPosition > 270 ) {
      setValue(5)
    }
    else if ( yPosition > 215 && yPosition < 270 ) {
      setValue(4)
    }
    else if ( yPosition > 168 && yPosition < 215 ) {
      setValue(3)
    }
    else if ( yPosition > 120 && yPosition < 168 ) {
      setValue(2)
    }
    else if ( yPosition > 60 && yPosition < 120 ) {
      setValue(1)
    }
    console.log(yPosition)
  }

  const [updateRating, setUpdate] = useState(false)

  const updateUserRating = () => {
    const data = {
      'id': getRatingID(comment.id),
      'value': newRatingValue,
      'token': user.token
    }
    updateRatingComment(data)
    setUpdate(false)
    getCommentRatings(subjects.commentsList)
  }

  const addUserRating = () => {
    const data = {
      'user_id': user.id,
      'comment_id': comment.id,
      'value': newRatingValue,
      'token': user.token
    }
    addRatingComment(data)
    getCommentRatings(subjects.commentsList)
  }

  if ( getUserRating(comment.id) === 0 ) {
    return (
      <div>
        <div
          onClick={ () => addUserRating() }
          onMouseOver={ event => changeRatingValue(event, comment.id) }
          className='rating'>
          <p>{ getUserRating(comment.id) === 0 ? newRatingValue : getUserRating(comment.id) }</p>
          <div
            id={'rate' + comment.id}
            className={'ratingValue ratingValue' + ( getUserRating(comment.id) === 0 ? newRatingValue : getUserRating(comment.id))}>
            <div className='ratingStick'></div>
          </div>
        </div>
        <div className='rating'>
          <p>{ commentRatingsAvg(comment.id) }</p>
          <div className={'ratingValue ratingValue' + commentRatingsAvg(comment.id) }>
            <div className='ratingStick'></div>
          </div>
        </div>
      </div>
    )
  }
  else if ( updateRating === false && getUserRating(comment.id) > 0 ) {
    return (
      <div>
        <div
          onClick={ () => setUpdate( !updateRating ) }
          onMouseOver={ event => changeRatingValue(event, comment.id) }
          className='rating'>
          <p>{ getUserRating(comment.id) === 0 ? newRatingValue : getUserRating(comment.id) }</p>
          <div
            id={'rate' + comment.id}
            className={'ratingValue ratingValue' + ( getUserRating(comment.id) === 0 ? newRatingValue : getUserRating(comment.id))}>
            <div className='ratingStick'></div>
          </div>
        </div>
        <div className='rating'>
          <p>{ commentRatingsAvg(comment.id) }</p>
          <div className={'ratingValue ratingValue' + commentRatingsAvg(comment.id) }>
            <div className='ratingStick'></div>
          </div>
        </div>
      </div>
    )
  }
  else if ( updateRating === true ) {
    return (
      <div>
        <div
          onClick={ () => updateUserRating() }
          onMouseOver={ event => changeRatingValue(event, comment.id) }
          className='rating'>
          <p>{ newRatingValue }</p>
          <div
            id={'rate' + comment.id}
            className={'ratingValue ratingValue' + newRatingValue }>
            <div className='ratingStick'></div>
          </div>
        </div>
        <div className='rating'>
          <p>{ commentRatingsAvg(comment.id) }</p>
          <div className={'ratingValue ratingValue' + commentRatingsAvg(comment.id) }>
            <div className='ratingStick'></div>
          </div>
        </div>
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
  getCommentRatings: comments => dispatch( getCommentRatings(comments) ),
  addRatingComment: comments => dispatch( addRatingComment(comments) ),
  updateRatingComment: comments => dispatch( updateRatingComment(comments) ),

  deactivate: () => dispatch( actions.deactivate() )
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumRatings)
