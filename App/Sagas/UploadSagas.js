import { put, call, take, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import FormFactory from '../Services/FormFactory'
import Response from '../Services/Response'

export function *setImage (api, action, type, actionMethod) {

  const { image, previousImage, failure } = action.payload
  const { sendPhoto } = api.methods()
  const data = FormFactory.create().appendImageToForm(image.uri, image.type, image.fileName).build()
  const {channel, uploadPhoto} = yield call(uploadChannel, sendPhoto, type, data)
  yield fork(uploadProgress, channel, actionMethod)

  try {
    const response = yield call(() => uploadPhoto)
    console.log(response, 'response')
    try {
      yield call(Response.resolve, response)
    }
    catch (error) {
      yield put(actionMethod({image: previousImage}))
      failure(error)
    }
  }
  finally {
    yield put(actionMethod({progress: null}))
  }
}

export function uploadChannel (uploadMethod, ...args) {

  let uploadPhoto = null
  const channel = eventChannel(emitter => {
    uploadPhoto = uploadMethod(...args, { onUploadProgress: (event) => {
      if (event.loaded.total === 1) {
        emitter(END)
      }
      else {
        emitter(event)
      }

    }})
    return () => {}
  })
  return {uploadPhoto, channel}
}

export function *uploadProgress (channel, actionMethod) {
  while (true) {
    let event = yield take(channel)
    yield put(actionMethod({progress: Math.round(event.loaded / event.total * 100)}))
  }
}
