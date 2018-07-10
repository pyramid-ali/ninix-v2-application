import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  id: null,
  name: null,
  weight: null,
  height: null,
  head: null,
  gestation: null,
  gender: null,
  birthDate: null,
  number: null,
  error: null,
  lastUpdate: null,
  fetch: false,
  image: null,
  imageProgress: null,

})

// define types and actions
const { Types, Creators } = createActions({
  getInformation: null,
  saveInformation: ['payload'],
  setInformation: ['payload'],
  setImage: ['payload'],
  imageProgressUpdate: ['progress'],
  didFail: ['error'],
  didImageSet: ['id'],
  didImageFail: ['previousImage'],
  retrieveImage: ['payload'],
  startPickingImage: null,
  didImagePickCancel: null
}, {
  prefix: 'baby/'
})

export const BabyTypes = Types

export const setInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    error: null,
    fetch: false,
    lastUpdate: moment()
  }
}

export const didFail = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
    fetch: false,
    lastUpdate: moment()
  }
}

export const saveInformation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    fetch: true
  }
}

export const getInformation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    fetch: true
  }
}

export const setImage = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    image: _.pick(payload.image, ['uri']),
    imageProgress: 0
  }
}

export const retrieveImage = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    image: payload
  }
}

export const imageProgressUpdate = (state = INITIAL_STATE, action) => {
  const { progress } = action
  return {
    ...state,
    imageProgress: progress
  }
}

export const startPickingImage = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    imageProgress: 0
  }
}

export const didImagePickCancel = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    imageProgress: null
  }
}

export const didImageSet = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    image: {
      ...state.image,
      id: action.id
    },
    imageProgress: null
  }
}

export const didImageFail = (state = INITIAL_STATE, action) => {
  const { previousImage } = action
  return {
    ...state,
    image: previousImage ? _.pick(previousImage, ['uri']) : null,
    imageProgress: null
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_INFORMATION]: setInformation,
  [Types.GET_INFORMATION]: getInformation,
  [Types.SAVE_INFORMATION]: saveInformation,
  [Types.DID_FAIL]: didFail,
  [Types.SET_IMAGE]: setImage,
  [Types.IMAGE_PROGRESS_UPDATE]: imageProgressUpdate,
  [Types.DID_IMAGE_SET]: didImageSet,
  [Types.DID_IMAGE_FAIL]: didImageFail,
  [Types.RETRIEVE_IMAGE]: retrieveImage,
  [Types.START_PICKING_IMAGE]: startPickingImage,
  [Types.DID_IMAGE_PICK_CANCEL]: didImagePickCancel
})


export default Creators
