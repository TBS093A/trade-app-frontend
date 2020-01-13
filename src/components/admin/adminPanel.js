import React from 'react'
import { connect } from 'react-redux'

import '../../styles/index.scss'

const AdminPanel = ({ user }) => {

  return (
    <div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, null)(AdminPanel)
