import Config from 'react-native-config'

// TODO: variables should define in some place and use it
const login = (username, password) => ({
  grant_type: Config.GRANT_TYPE,
  client_secret: 'fgc2adUmxjpGqeO5JGg2KwOIVYf7GeBWQvS3CeDR',
  client_id: Config.CLIENT_ID,
  scope: '*',
  username,
  password
})


export default {
  login
}
