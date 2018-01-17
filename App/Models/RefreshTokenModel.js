import Config from 'react-native-config'

export default class RefreshTokenModel {

  constructor(refreshToken) {
    this.refreshToken = refreshToken
  }

  fields() {
    return {
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken,
      client_secret: 'bbDi2b3yAQjPBESzu7ULERIc38JaaqZeuE2Srtim',
      client_id: Config.CLIENT_ID,
      scope: '*'
    }
  }
}

// TODO: Config.CLIENT_SECRET
