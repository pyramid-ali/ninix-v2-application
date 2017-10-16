// // a library to wrap and simplify api calls
// import apisauce from 'apisauce'
// import Token from "./Token"
// import RefreshTokenModel from '../Models/RefreshTokenModel';
// import UserAction from '../Redux/UserRedux'
// import { store } from '../Containers/App'
//
// // TODO: user Config.API_URL
// const create = async (baseURL = 'https://2631a8cb.ngrok.io/' ) => {
//
//   let authorized = null
//
//   /***
//    * create new api
//    * @type {ApisauceInstance}
//    */
//   const api = apisauce.create({
//     baseURL,
//     headers: {
//       'Accept': 'application/json',
//       'Cache-Control': 'no-cache'
//     },
//     timeout: 10000
//   })
//
//   /***
//    * if user logged in, we reload the api to set header Authorization
//    * @param value
//    */
//   const reload = async (value: any) => {
//     try {
//       const token = await Token.create(value)
//       api.setHeader('Authorization', token.authorizationHeader())
//       authorized = authenticatedRequest(api)
//     }
//     catch (error) {
//       console.log('cannot save the token', error)
//     }
//
//   }
//
//   /***
//    * request mobile activation code
//    * @param mobile string, regex: \09\d{9}\
//    */
//   const requestActivationCode = (mobile) => api.post('api/register/mobile', { mobile })
//
//   /***
//    * check activation code with provided mobile route
//    * @param mobile string,
//    * @param token string, 4 character code
//    */
//   const checkActivationCode = ({mobile, token}) => api.post('api/register/activation/sms', {mobile, token})
//
//   /***
//    * login with username (mobile) and password
//    * @param loginFields
//    */
//   const login = (loginFields) => api.post('oauth/token', loginFields)
//
//   /***
//    * refresh token
//    * @param refreshFields
//    */
//   const refreshToken = (refreshFields) => api.post('oauth/token/refresh', refreshFields)
//
//   const getAuthorized = () => authorized
//
//   try {
//     const token = await Token.build()
//
//     const response = await refreshToken(new RefreshTokenModel(token.refreshToken()).fields())
//     console.log(response, 'response refresh token')
//     if (response.ok) {
//       await reload(response.data)
//       store.dispatch(UserAction.loggedIn())
//     } else {
//       store.dispatch(UserAction.loggedOut())
//     }
//   }
//   catch (error) {
//     store.dispatch(UserAction.loggedOut())
//   }
//
//   return {
//     login,
//     requestActivationCode,
//     checkActivationCode,
//     refreshToken,
//     getAuthorized,
//     reload
//   }
// }
//
// const authenticatedRequest = (api) => {
//
//   /***
//    * get user information route
//    */
//   const userInformation = () => api.get('api/user')
//
//   /***
//    * change password
//    * @param passwords
//    */
//   const changePassword = (passwords) => api.post('api/user/change_password', passwords)
//
//   /***
//    * get parent or baby information
//    * @param type string, one of (baby|father|mother)
//    */
//   const getInformation = (type: string) => api.get('api/information/' + type)
//
//   /***
//    * get devices logs for this user
//    * @param mac string, mac address of device
//    */
//   const getDeviceLogs = (mac: string) => api.get('api/device/logs')
//
//   /***
//    * get parent or baby image
//    * @param type string, one of (baby|father|mother)
//    */
//   const getPhoto = (type: string) => api.get('api/photo/' + type)
//
//   /***
//    * send information of parents or baby
//    * @param type string, one of (baby|father|mother)
//    * @param options Object
//    */
//   const sendInformation = (type: string, options: Object) => api.post('api/information/' + type, options)
//
//   /***
//    * send device log to server to save them in cloud
//    * @param options
//    */
//   const sendDeviceLog = (options: Object) => api.post('api/device/log', options)
//
//   /***
//    * send array of data obtained from ninix device
//    * @param options
//    */
//   const sendData = (options: object[]) => api.post('api/data', options)
//
//   return {
//     userInformation,
//     changePassword,
//     getInformation,
//     getDeviceLogs,
//     getPhoto,
//     sendInformation,
//     sendDeviceLog,
//     sendData
//   }
// }
//
// export default {
//   create
// }
