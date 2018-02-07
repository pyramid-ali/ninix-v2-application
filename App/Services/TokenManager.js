import { getItem, setItem, removeItem } from './Storage'
import moment from 'moment'

export const jsonTokenToObject = (token) => ({
  accessToken: token['access_token'],
  refreshToken: token['refresh_token'],
  expiresAt: moment().add(token['expires_in'], 's'),
  tokenType: token['token_type']
})

export const getToken = async () => {
  const token = await getItem('token')
  return JSON.parse(token)
}

export const setToken = async (token) => {
  const tokenObject = jsonTokenToObject(token)
  await setItem('token', JSON.stringify(tokenObject))
  return tokenObject
}

export const removeToken = async () => {
  await removeItem('token')
}

export const isTokenValid = (token) => (
  moment(token.expiresAt).diff(moment(), 'hours')  < 1
)
