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

const addComment = item => ({
  type: types.ADD_COMMENT, item
})

export default {
  getSubjectComments,
  activate,
  deactivate,
  addComment
}
