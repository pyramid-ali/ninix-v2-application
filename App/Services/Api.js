// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Config from 'react-native-config'
import { store } from '../Containers/App'
import moment from 'moment'

const create = (baseURL = Config.API_URL) => {
  const unauthorizedApi = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const login = (loginFields) => unauthorizedApi.post('oauth/login', loginFields)
  const requestActivationCode = (mobile) => unauthorizedApi.post('oauth/register/token', { mobile })
  const checkActivationCode = ({mobile, token}) => unauthorizedApi.post('oauth/register/verify', {mobile, token})
  const signup = (signupFields) => unauthorizedApi.post('oauth/register', signupFields)
  const refreshToken = (refreshFields) => unauthorizedApi.post('oauth/refresh', refreshFields)

  return {
    login,
    requestActivationCode,
    checkActivationCode,
    signup,
    refreshToken
  }

}

const createAuthorized = (baseURL = Config.API_URL) => {
  const { token } = store.getState()
  const revokeTime = moment().unix() - (24 * 60 * 60) // revoke time is one day before expire time

  console.log('authorized api')

  const authorizedApi = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': token.type + ' ' + token.accessToken
    },
    timeout: 10000
  })

  const retrieveFatherInformation = () => authorizedApi.get('parents/sync/father')
  const retrieveMotherInformation = () => authorizedApi.get('parents/sync/mother')
  const retrieveBabyInformation = () => authorizedApi.get('baby/sync')
  const postFatherInformation = (parentFields) => authorizedApi.post('parents/sync/father', parentFields)
  const postMotherInformation = (parentFields) => authorizedApi.post('parents/sync/mother', parentFields)
  const postBabyInformation = (babyFields) => authorizedApi.post('baby/sync', babyFields)

  const uploadPhoto = (url, image, onUploadProgress) => authorizedApi.post(url, image, {onUploadProgress})

  const uploadBabyImage = (image, onUploadProgress) => uploadPhoto('uploads/avatar/baby', image, onUploadProgress)
  const uploadFatherImage = (image, onUploadProgress) => uploadPhoto('uploads/avatar/father', image, onUploadProgress)
  const uploadMotherImage = (image, onUploadProgress) => uploadPhoto('uploads/avatar/mother', image, onUploadProgress)

  const sendData = (data) => uploadPhoto('stream/notify', {data})

  return {
    retrieveFatherInformation,
    retrieveMotherInformation,
    retrieveBabyInformation,
    postFatherInformation,
    postMotherInformation,
    postBabyInformation,
    uploadBabyImage,
    uploadFatherImage,
    uploadMotherImage,
    sendData
  }
}

export default {
  create,
  createAuthorized
}
