import {
  SPOTIFY_CLIENT_CALLBACK,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_TOKEN_REFRESH_URL,
  SPOTIFY_TOKEN_SWAP_URL,
  APPLE_MUSIC_TOKEN,
} from 'react-native-dotenv'

export const APPLE_CONFIG = {
  token: APPLE_MUSIC_TOKEN,
}

export const SPOTIFY_CONFIG = {
  clientId: SPOTIFY_CLIENT_ID, // available on the app page
  clientSecret: SPOTIFY_CLIENT_SECRET, // click "show client secret" to see this
  redirectUrl: SPOTIFY_CLIENT_CALLBACK, // the redirect you defined after creating the app
  tokenSwapUrl: SPOTIFY_TOKEN_SWAP_URL,
  tokenRefreshUrl: SPOTIFY_TOKEN_REFRESH_URL,
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
  ], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
}

export const RemoteEvent = {
  PLAYER_STATE_CHANGED: 'playerStateChanged',
  REMOTE_DISCONNECTED: 'remoteDisconnected',
  REMOTE_CONNECTED: 'remoteConnected',
}

export const MAXIMUM_RETRY_AUTH_REMOTE = 1
