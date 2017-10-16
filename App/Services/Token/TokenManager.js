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
  return token.expiresAt.diff(moment(), 'hours') > 0
}

const refreshToken = async (refreshToken) => {
  const api = PublicApi.create()
  const response = api.refreshToken(new RefreshTokenModel(refreshToken).fields())
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
  }
  catch (error) {
    retryLoad += 1
    if (retryLoad <= 3) {
      return await getToken()
    }
    return null
  }

  if (!token) {
    return null
  }

  try {
    return await refreshToken(token.refreshToken)
  }
  catch (error) {
    // cannot refresh token
    if (validateToken(token)) {
      return token
    }
  }

  return null
}

const authorizationHeader = (token) => (token.type + ' ' + token.accessToken)

const save = async (tokenResponse: object) => {
  const token = jsonFormatter(tokenResponse)
  await TokenRepository.save(token)
  return token
}

export default {
  getToken,
  save,
  authorizationHeader
}
