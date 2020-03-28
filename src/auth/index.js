import { authorize } from 'react-native-app-auth';

const config = {
  clientId: 'c81829338e324b9ebd3169647d1d6482', // available on the app page
  clientSecret: 'eafd64f9ca744f17a89df2399fd5f354', // click "show client secret" to see this
  redirectUrl: 'com.myapp:/oauth', // the redirect you defined after creating the app
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export const doAuthentication = async () => {
  const authState = await authorize(config);
  return authState;
};
