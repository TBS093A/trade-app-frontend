import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSubjectsThread } from '../stores/subjects/duck/operations'

import '../styles/index.scss'

const Index = ({subjects, getSubjectsThread}) =>{

  useEffect( () => { getSubjectsThread() }, [])

  return <ul>
      {subjects.list.map(subject => <li>{subject}</li>)}
    </ul>
}

  // do odczytu globalnego state'a

const mapStateToProps = state => ({
  subjects: state.subjects
})

  // do modyfikacji globalnego state'a

const mapDispatchToProps = dispatch => ({
  getSubjectsThread: () => dispatch( getSubjectsThread() )
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
