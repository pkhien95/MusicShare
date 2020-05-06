import axios from 'axios'
import { store } from '../store'
import { get } from 'lodash'
import { APPLE_CONFIG } from '../constants/spotify'

const spotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

spotifyInstance.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer ${get(
      store.getState(),
      'spotify.auth.accessToken',
    )}`,
  }
  return config
})

const appleMusicInstance = axios.create({
  baseURL: 'https://api.music.apple.com/v1/catalog/us',
})

appleMusicInstance.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer ${APPLE_CONFIG.token}`,
  }
  return config
})

export { spotifyInstance, appleMusicInstance }
