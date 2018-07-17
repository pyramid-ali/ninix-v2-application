import Config from 'react-native-config';

// TODO: variables should define in some place and use it
const login = (username, password) => ({
  grant_type: Config.GRANT_TYPE,
  client_secret: 'SrC4BVjsgZG5Br5zzrWN9Q0AUgv83C0gofD4R0lc',
  client_id: Config.CLIENT_ID,
  scope: '*',
  username,
  password,
});

const refreshToken = refreshToken => ({
  refresh_token: refreshToken,
  grant_type: Config.GRANT_TYPE,
  client_secret: 'SrC4BVjsgZG5Br5zzrWN9Q0AUgv83C0gofD4R0lc',
  client_id: Config.CLIENT_ID,
  scope: '*',
});

export default {
  login,
  refreshToken,
};
