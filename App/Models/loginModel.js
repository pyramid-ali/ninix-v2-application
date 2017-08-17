import Config from 'react-native-config'

export default class LoginModel {

  constructor(mobile, password) {
    this.mobile = mobile
    this.password = password
  }

  fields() {
    return {
      grant_type: Config.GRANT_TYPE,
      mobile: this.mobile,
      password: this.password,
      client_secret: Config.CLIENT_SECRET,
      client_id: Config.CLIENT_ID,
      scope: '*'
    }
  }
}
