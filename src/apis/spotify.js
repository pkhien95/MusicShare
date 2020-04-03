import { spotifyInstance } from './base'
import axios from 'axios'
export const search = (
  keywords: string,
  types: string,
  limit: number = 20,
  offset: number = 0,
) => {
  return spotifyInstance.get('search', {
    params: {
      q: keywords,
      type: types,
      limit,
      offset,
    },
  })
}
