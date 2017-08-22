import Config from 'react-native-config'

export default class RefreshTokenModel {

  constructor(refreshToken) {
    this.refreshToken = refreshToken
  }

  fields() {
    return {
      grant_type: Config.GRANT_TYPE,
      refresh_token: this.refreshToken,
      client_secret: Config.CLIENT_SECRET,
      client_id: Config.CLIENT_ID,
      scope: '*'
    }
  }
}
