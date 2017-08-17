import Config from 'react-native-config'

export default class SignupModel {

  constructor(mobile, password, token) {
    this.mobile = mobile
    this.password = password
    this.token = token
  }

  fields() {
    return {
      grant_type: Config.GRANT_TYPE,
      mobile: this.mobile,
      password: this.password,
      client_secret: Config.CLIENT_SECRET,
      client_id: Config.CLIENT_ID,
      token: this.token,
      scope: '*'
    }
  }
}
