import types from './types'

const register = item => ({
  type: types.REGISTER, item
})

const editAccount = item => ({
  type: types.EDIT_ACCOUNT, item
})

const adminPanel = item => ({
  type: types.ADMIN_PANEL, item
})

const exchange = item => ({
  type: types.EXCHANGE, item
})

const forum = item => ({
  type: types.FORUM, item
})

const reset = item => ({
  type: types.RESET, item
})

export default {
  register,
  editAccount,
  adminPanel,
  exchange,
  forum,
  reset,
}
