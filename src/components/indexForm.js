import React from 'react'
import { connect } from 'react-redux'
import actions from '../stores/subjects/duck/actions'

const IndexForm = (props) => {

  const subjectInput = React.createRef()

  const addSubject = (event) => {
    event.preventDefault()
    props.add(subjectInput.current.value)

    subjectInput.current.value = ''
  }

  return (
    <form onSubmit={addSubject}>
      <input ref={subjectInput} />
      <button type='submit'>Add Subject</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  add: subject => dispatch(actions.add(subject))
})

export default connect(null, mapDispatchToProps)(IndexForm)
