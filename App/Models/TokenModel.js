import moment from 'moment'

export default class TokenModel {

  static correctObject(token) {
    const now = moment().add(token['expires_in'], 's')
    console.log(token, 'token in token model')
    return {
      accessToken: token['access_token'],
      refreshToken: token['refresh_token'],
      type: token['token_type'],
      expireAt: now.unix()
    }
  }

}
