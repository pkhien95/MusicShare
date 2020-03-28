import { authorize } from 'react-native-app-auth';
import Reactotron from 'reactotron-react-native';

const config = {
  clientId: 'c81829338e324b9ebd3169647d1d6482', // available on the app page
  clientSecret: 'eafd64f9ca744f17a89df2399fd5f354', // click "show client secret" to see this
  redirectUrl: 'http://com.theuimachine.music:/oauth', // the redirect you defined after creating the app
  scopes: [
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-library-modify',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-recently-played',
    'user-top-read',
  ], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export const doAuthentication = async () => {
  const authState = await authorize(config);
  Reactotron.log(authState);
  console.log(authState);
  return authState;
};
