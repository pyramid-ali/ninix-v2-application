import moment from 'moment'
import TokenRepository from './ASTokenRepository'
import PublicApi from '../Api/Public'
import RefreshTokenModel from '../../Models/RefreshTokenModel';

const jsonFormatter = (token: object) => ({
  accessToken: token.access_token,
  refreshToken: token.refresh_token,
  type: token.token_type,
  expiresAt: moment().add(token.expires_in, 'seconds')
})


const validateToken = async (token) => {
  return moment(token.expiresAt).diff(moment(), 'hours') > 0
}

const refreshToken = async (refreshToken) => {
  console.log(refreshToken, 'refresh token')
  const api = PublicApi.create()
  const response = await api.refreshToken(new RefreshTokenModel(refreshToken).fields())
  console.log('refresh token response', response)
  if (response.ok) {
    const token = jsonFormatter(response.data)
    await TokenRepository.save(token)
    return token
  }
  else {
    throw new Error('cannot refresh token')
  }
}

let retryLoad = 0
const getToken = async () => {
  let token = null
  try {
    token = await TokenRepository.load()
    retryLoad = 0
    if (!token) {
      return null
    }
  }
  catch (error) {
    console.log('error occurred when retrieving token', error)
    retryLoad += 1
    if (retryLoad <= 3) {
      return await getToken()
    }
    return null
  }

  if (shouldTokenRefresh(token)) {
    try {
      token = await refreshToken(token.refreshToken)
      await save(token)
      return token
    }
    catch (error) {
      console.log('error occurred when refreshing token', error)
      // cannot refresh token
      if (validateToken(token)) {
        return token
      }
    }

    return null
  }

  return token
}

const authorizationHeader = (token) => (token.type + ' ' + token.accessToken)

const save = async (tokenResponse: object) => {
  const token = jsonFormatter(tokenResponse)
  console.log('start saving token')
  await TokenRepository.save(token)
  return token
}

const shouldTokenRefresh = (token) => {
  return moment(token.expiresAt).diff(moment(), 'days') < 1
}

const remove = async () => {
  await TokenRepository.remove()
}

export default {
  getToken,
  save,
  remove,
  authorizationHeader
}
