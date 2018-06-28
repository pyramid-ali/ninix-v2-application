// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Form from './Form'
import RNFetchBlob from 'rn-fetch-blob'

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
    timeout: 10 * 1000
  })

  const authorizationHeader = (accessToken) => ({headers: {Authorization: `Bearer ${accessToken}`}})

  /***
   * request mobile activation code
   * @param mobile string, regex: \09\d{9}\
   * @returns {Promise<ApiResponse<any>>}
   */
  const requestRegisterToken = (mobile) => api.post('register/request_token', { mobile })

  /***
   * check activation code with provided mobile route
   * @param mobile string,
   * @param token string, 4 character code
   * @returns {Promise<ApiResponse<any>>}
   */
  const checkToken = (mobile, token) => api.post('check_token', {mobile, token})

  /***
   * register new user
   * @param mobile string,
   * @param token string, 4 character code
   * @param password
   * @returns {Promise<ApiResponse<any>>}
   */
  const register = (mobile, token, password) => api.post('register', {mobile, token, password})

  /***
   * login with username (mobile) and password
   * @param mobile
   * @param password
   * @returns {Promise<ApiResponse<any>>}
   */
  const login = (mobile, password) => api.post('login', Form.login(mobile, password))

  /***
   * refresh token
   * @param refreshToken
   * @returns {Promise<ApiResponse<any>>}
   */
  const refreshToken = (refreshToken) => api.post('login ', Form.refreshToken(refreshToken))

  /***
   * request forgot password activation code
   * @param mobile string, regex: \09\d{9}\
   * @returns {Promise<ApiResponse<any>>}
   */
  const requestForgotPasswordToken = (mobile) => api.post('forgot_password/request_token', { mobile })

  /***
   * update forgot password
   * @param mobile string,
   * @param token string, 4 character code
   * @param password
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateForgotPassword = (mobile, token, password) => api.post('forgot_password', {mobile, token, password})

  /***
   * get user information route
   * @returns {Promise<ApiResponse<any>>}
   */
  const userInformation = (token: string) => api.get('api/user', {}, authorizationHeader(token))

  /***
   * get baby information
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const getBaby = (token: string) => api.get('baby', {}, authorizationHeader(token))

  /***
   * get father information
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const getFather = (token: string) => api.get('father', {}, authorizationHeader(token))

  /***
   * get mother information
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const getMother = (token: string) => api.get('mother', {}, authorizationHeader(token))

  /***
   * update baby information
   * @param data
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateBaby = (data, token) => api.put('baby/update', data, authorizationHeader(token))

  /***
   *
   * @param data
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateFather = (data, token) => api.put('father/update', data, authorizationHeader(token))

  /***
   *
   * @param data
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateMother = (data, token) => api.put('mother/update', data, authorizationHeader(token))

  /***
   * @param token
   * @param data
   * @param config
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeBabyImage = (token, data, config) => api.post('baby/images', data, {...authorizationHeader(token), ...config})

  /***
   * update daily stat for baby, include: weight, height, head circumference
   * @param data
   * @param token
   */
  const updateDailyStat = (data, token) => api.put('daily_stats/update', {data}, authorizationHeader(token))

  /***
   * get baby's daily stats
   * @param token
   */
  const getDailyStats = (token) => api.get('daily_stats', {}, authorizationHeader(token))

  /***
   * send array of data obtained from ninix device
   * @param data
   * @param token
   */
  const sendData = (data, token) => api.post('vital_signs', data, authorizationHeader(token))

  /***
   * send array of alarms obtained from ninix device
   * @param data
   * @param token
   */
  const sendAlarms = (data, token) => api.post('alarms', data, authorizationHeader(token))

  /***
   *
   * @param data
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const sendConnectLog = (data, token) => api.post('device/connect', data, authorizationHeader(token))

  /***
   *
   * @param data
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const sendDisconnectLog = (data, token) => api.post('device/disconnect', data, authorizationHeader(token))

  /***
   * get baby images
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const getBabyImages = (token) => api.get('baby/images', {}, authorizationHeader(token))

  /***
   * logout
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const logout = (token) => api.post('logout', {}, authorizationHeader(token))

  /***
   * change password
   * @param data
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const changePassword = (data, token) => api.put('change_password', data, authorizationHeader(token))

  /***
   * check latest firmware version available
   * @param token
   * @returns {Promise<ApiResponse<any>>}
   */
  const checkFirmwareVersion = (token) => api.get('firmware/latest', {}, authorizationHeader(token))

  // /***
  //  * get devices logs for this user
  //  * @param mac string, mac address of device
  //  * @param token
  //  */
  // const getDeviceLogs = (token: string) => api.get('api/device/logs', {}, authorizationHeader(token))
  //
  // /***
  //  * get parent or baby image
  //  * @param type string, one of (baby|father|mother)
  //  * @param token
  //  */
  // const getPhoto = (type: string, token: string) => api.get('api/photo/' + type, {}, authorizationHeader(token))
  //
  // /***
  //  * send photo to server to save in cloud
  //  * @param type
  //  * @param data
  //  * @param token
  //  */
  // const sendPhoto = (type: string, data, token: string) => api.post('api/photo/' + type, data, authorizationHeader(token))
  //
  // /***
  //  * send information of parents or baby
  //  * @param type string, one of (baby|father|mother)
  //  * @param options
  //  * @param token
  //  */
  // const sendInformation = (type: string, options: Object, token: string) => api.post('api/information/' + type, options, authorizationHeader(token))
  //
  // /***
  //  * send device log to server to save them in cloud
  //  * @param data
  //  * @param token
  //  */
  // const sendDeviceLog = (data: Object, token: string) => api.post('api/device/log', data, authorizationHeader(token))
  //
  // /***
  //  * send array of data obtained from ninix device
  //  * @param data
  //  * @param token
  //  */
  // const sendData = (data: Object[], token: string) => api.post('api/data', data, authorizationHeader(token))
  //
  // const getLatestFirmwareVersion = (token: string) => api.get('api/firmware/version', {}, authorizationHeader(token))

  return {
    login,
    requestRegisterToken,
    checkToken,
    register,
    refreshToken,
    requestForgotPasswordToken,
    updateForgotPassword,
    userInformation,
    changePassword,
    getBaby,
    getFather,
    getMother,
    updateBaby,
    updateFather,
    updateMother,
    updateDailyStat,
    getDailyStats,
    storeBabyImage,
    sendConnectLog,
    sendDisconnectLog,
    logout,
    sendAlarms,
    getBabyImages,
    checkFirmwareVersion,
    // getDeviceLogs,
    // getPhoto,
    // sendPhoto,
    // sendInformation,
    // sendDeviceLog,
    sendData,
    // getLatestFirmwareVersion
  }
}

const download = (path, token) => RNFetchBlob.config({
  fileCache: true
}).fetch('GET', path, {
  Authorization: `Bearer ${token}`
})

const removeDownloadedFile = path => RNFetchBlob.fs.unlink(path)

export default {
  create,
  download,
  removeDownloadedFile
}

