import types from './types'

const getAll = item => ({
  type: types.GET_ALL_THREADS, item
})

const getThreadSubjects = item => ({
  type: types.GET_THREAD_SUBJECTS, item
})

const activate = item => ({
  type: types.ACTIVATE_THREAD, item
})

const deactivate = item => ({
  type: types.DEACTIVATE_THREAD, item
})

export default {
  getAll,
  getThreadSubjects,
  activate,
  deactivate
}
