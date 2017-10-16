import Config from 'react-native-config'

export default class LoginModel {

  constructor(mobile, password) {
    this.mobile = mobile
    this.password = password
  }

  fields() {
    return {
      grant_type: Config.GRANT_TYPE,
      username: this.mobile,
      password: this.password,
      client_secret: 'bbDi2b3yAQjPBESzu7ULERIc38JaaqZeuE2Srtim',
      client_id: Config.CLIENT_ID,
      scope: '*'
    }
  }
}

// TODO: Config.CLIENT_SECRET
