import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Colors from '../Themes/Colors'


export const INITIAL_STATE = Immutable({
  statusBarBackground: Colors.gray
})


const { Types, Creators } = createActions({
  changeStatusBarBackground: ['payload']
}, {
  prefix: 'style/'
})

export const StyleTypes = Types

export const changeStatusBarBackground = (state = INITIAL_STATE, action) => {

  return {
    statusBarBackground: action.payload
  }

}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS_BAR_BACKGROUND]: changeStatusBarBackground
})

export default Creators
