import { get } from 'lodash'

export const transformArtistsToSpotify = artists => {
  return artists.map(artist => {
    return {
      id: artist.id,
      name: get(artist, 'attributes.name'),
      images: [],
    }
  })
}

export const transformAlbumsToSpotify = albums => {
  return albums.map(album => {
    const url = get(album, 'attributes.artwork.url')
    let image = url.replace('{w}', '80')
    image = image.replace('{h}', '80')

    return {
      id: album.id,
      name: get(album, 'attributes.name'),
      images: [{ url: image }],
    }
  })
}
