import axios from 'axios'
import { store } from '../store'
import { get } from 'lodash'

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

export { spotifyInstance }
