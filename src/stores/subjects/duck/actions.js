import types from './types'

const getSubjectComments = item => ({
  type: types.GET_SUBJECT_COMMENTS, item
})

const activate = item => ({
  type: types.ACTIVATE, item
})

const deactivate = item => ({
  type: types.DEACTIVATE, item
})

export default {
  getSubjectComments,
  activate,
  deactivate
}
