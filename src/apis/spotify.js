import { spotifyInstance } from './base'

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

export const getAlbumDetails = (id: string) => {
  return spotifyInstance.get(`albums/${id}`)
}

export const getArtistTopTracks = (id: string) => {
  return spotifyInstance.get(`artists/${id}/top-tracks?country=US`)
}
