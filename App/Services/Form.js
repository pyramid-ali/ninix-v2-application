import Config from 'react-native-config'

// TODO: variables should define in some place and use it
const login = (username, password) => ({
  grant_type: Config.GRANT_TYPE,
  client_secret: 'uzRpyUeFkiUAfxqGXib5r9N6uzLVZlGxdTtsvD8e',
  client_id: Config.CLIENT_ID,
  scope: '*',
  username,
  password
})

const refreshToken = (refreshToken) => ({
  refresh_token: refreshToken,
  grant_type: Config.GRANT_TYPE,
  client_secret: 'uzRpyUeFkiUAfxqGXib5r9N6uzLVZlGxdTtsvD8e',
  client_id: Config.CLIENT_ID,
  scope: '*',
})


export default {
  login,
  refreshToken
}
