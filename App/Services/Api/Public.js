// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// TODO: user Config.API_URL
const create = (baseURL = 'https://8d14c115.ngrok.io/') => {

  /***
   * create new api
   * @type {ApisauceInstance}
   */
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  /***
   * request mobile activation code
   * @param mobile string, regex: \09\d{9}\
   */
  const requestActivationCode = (mobile) => api.post('api/register/mobile', { mobile })

  /***
   * check activation code with provided mobile route
   * @param mobile string,
   * @param token string, 4 character code
   */
  const checkActivationCode = ({mobile, token}) => api.post('api/register/activation/sms', {mobile, token})

  /***
   * login with username (mobile) and password
   * @param loginFields
   */
  const login = (loginFields) => api.post('oauth/token', loginFields)

  /***
   * refresh token
   * @param refreshFields
   */
  const refreshToken = (refreshFields) => api.post('oauth/token', refreshFields)



  return {
    login,
    requestActivationCode,
    checkActivationCode,
    refreshToken,
  }
}

export default {
  create
}
