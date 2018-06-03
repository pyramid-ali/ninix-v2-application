// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Form from './Form'

// TODO: user Config.API_URL
const create = (baseURL = 'https://api.ninixco.com/api/v1') => {

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
    timeout: 100 * 1000
  })

  const authorizationHeader = (accessToken) => ({headers: {Authorization: `Bearer ${accessToken}`}})

  /***
   * request mobile activation code
   * @param mobile string, regex: \09\d{9}\
   */
  const requestRegisterToken = (mobile) => api.post('register/request_token', { mobile })

  /***
   * check activation code with provided mobile route
   * @param mobile string,
   * @param token string, 4 character code
   */
    // TODO: change checkToken to check_token
  const checkToken = (mobile, token) => api.post('checkToken', {mobile, token})

  /***
   * register new user
   * @param mobile string,
   * @param token string, 4 character code
   * @param password
   */
  const register = (mobile, token, password) => api.post('register', {mobile, token, password})

  /***
   * login with username (mobile) and password
   * @param mobile
   * @param password
   */
  const login = (mobile, password) => api.post('oauth/token', Form.login(mobile, password))

  /***
   * refresh token
   * @param refreshToken
   */
  const refreshToken = (refreshToken) => api.post('oauth/token', Form.refreshToken(refreshToken))

  /***
   * get user information route
   */
  const userInformation = (token: string) => api.get('api/user', {}, authorizationHeader(token))

  /***
   * change password
   * @param passwords
   * @param token
   */
  const changePassword = (passwords, token: string) => api.post('api/user/change_password', passwords, authorizationHeader(token))

  /***
   * get baby information
   * @param token
   */
  const getBaby = (token: string) => api.get('baby', {}, authorizationHeader(token))

  /***
   * update baby information
   * @param data
   * @param token
   */
  const updateBaby = (data, token) => api.put('baby/update', data, authorizationHeader(token))

  /***
   * get devices logs for this user
   * @param mac string, mac address of device
   * @param token
   */
  const getDeviceLogs = (token: string) => api.get('api/device/logs', {}, authorizationHeader(token))

  /***
   * get parent or baby image
   * @param type string, one of (baby|father|mother)
   * @param token
   */
  const getPhoto = (type: string, token: string) => api.get('api/photo/' + type, {}, authorizationHeader(token))

  /***
   * send photo to server to save in cloud
   * @param type
   * @param data
   * @param token
   */
  const sendPhoto = (type: string, data, token: string) => api.post('api/photo/' + type, data, authorizationHeader(token))

  /***
   * send information of parents or baby
   * @param type string, one of (baby|father|mother)
   * @param options
   * @param token
   */
  const sendInformation = (type: string, options: Object, token: string) => api.post('api/information/' + type, options, authorizationHeader(token))

  /***
   * send device log to server to save them in cloud
   * @param data
   * @param token
   */
  const sendDeviceLog = (data: Object, token: string) => api.post('api/device/log', data, authorizationHeader(token))

  /***
   * send array of data obtained from ninix device
   * @param data
   * @param token
   */
  const sendData = (data: Object[], token: string) => api.post('api/data', data, authorizationHeader(token))

  const getLatestFirmwareVersion = (token: string) => api.get('api/firmware/version', {}, authorizationHeader(token))

  return {
    login,
    requestRegisterToken,
    checkToken,
    register,
    refreshToken,
    userInformation,
    changePassword,
    getBaby,
    updateBaby,
    getDeviceLogs,
    getPhoto,
    sendPhoto,
    sendInformation,
    sendDeviceLog,
    sendData,
    getLatestFirmwareVersion
  }
}

export default {
  create
}

