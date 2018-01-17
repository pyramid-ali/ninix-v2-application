// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import TokenManager from '../Token/TokenManager'

const privateApi = (api) => {

  /***
   * get user information route
   */
  const userInformation = () => api.get('api/user')

  /***
   * change password
   * @param passwords
   */
  const changePassword = (passwords) => api.post('api/user/change_password', passwords)

  /***
   * get parent or baby information
   * @param type string, one of (baby|father|mother)
   */
  const getInformation = (type: string) => api.get('api/information/' + type)

  /***
   * get devices logs for this user
   * @param mac string, mac address of device
   */
  const getDeviceLogs = (mac: string) => api.get('api/device/logs')

  /***
   * get parent or baby image
   * @param type string, one of (baby|father|mother)
   */
  const getPhoto = (type: string) => api.get('api/photo/' + type)

  /***
   * send photo to server to save in cloud
   * @param type
   * @param data
   */
  const sendPhoto = (type: string, data, options) => api.post('api/photo/' + type, data, options)

  /***
   * send information of parents or baby
   * @param type string, one of (baby|father|mother)
   * @param options Object
   */
  const sendInformation = (type: string, options: Object) => api.post('api/information/' + type, options)

  /***
   * send device log to server to save them in cloud
   * @param options
   */
  const sendDeviceLog = (options: Object) => api.post('api/device/log', options)

  /***
   * send array of data obtained from ninix device
   * @param options
   */
  const sendData = (options: object[]) => api.post('api/data', options)

  return {
    userInformation,
    changePassword,
    getInformation,
    getDeviceLogs,
    getPhoto,
    sendPhoto,
    sendInformation,
    sendDeviceLog,
    sendData
  }
}



const create = async (baseURL = 'https://8d14c115.ngrok.io/') => {
  console.log('private api create')
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const authorize = async (tokenInput = null) => {
    let token = null
    if (!tokenInput) {
      token = await TokenManager.getToken()
    }
    else {
      token = tokenInput
    }

    if (token) {
      console.log('token set', token)
      api.setHeader('Authorization', TokenManager.authorizationHeader(token))
    }
  }

  // set Authorization header
  await authorize()

  const methods = () => privateApi(api)

  return {
    authorize,
    methods
  }

}

export default {
  create
}
