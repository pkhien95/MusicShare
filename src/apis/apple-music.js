import { appleMusicInstance } from './base'

export const search = (
  keywords: string,
  types: string = 'artists,albums',
  limit: number = 20,
  offset: number = 0,
) => {
  return appleMusicInstance.get('search', {
    params: {
      term: keywords,
      types: types,
      limit,
      offset,
    },
  })
}

export const getAlbumDetails = (id: string) => {
  return appleMusicInstance.get(`albums/${id}`)
}
