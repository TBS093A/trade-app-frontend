import types from './types'

const INITIAL_STATE = {
  forum: false,
  exchange: false,
  edit: false,
  register: false,
  adminPanel: false,
}

const movementsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.EXCHANGE:
      return {
        exchange: true,
        forum: false,
        edit: false,
        register: false,
        adminPanel: false
      }
    case types.FORUM:
      return {
        forum: true,
        exchange: false,
        edit: false,
        register: false,
        adminPanel: false
      }
    case types.REGISTER:
      return {
        register: true,
        forum: false,
        exchange: false,
        edit: false,
        adminPanel: false
      }
    case types.EDIT_ACCOUNT:
      return {
        edit: true,
        forum: false,
        exchange: false,
        register: false,
        adminPanel: false
      }
    case types.ADMIN_PANEL:
     return {
       adminPanel: true,
       edit: false,
       forum: false,
       exchange: false,
       register: false
     }
    case types.RESET:
      return {
        edit: false,
        forum: false,
        exchange: false,
        register: false,
        adminPanel: false
      }
    default:
      return state;
  }
}

export default movementsReducer
