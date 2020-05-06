import { get } from 'lodash'

export const transformArtistsToSpotify = artists => {
  return artists.map(artist => {
    return {
      id: artist.id,
      name: get(artist, 'attributes.name'),
      images: [],
      ...artist.attributes,
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
      artistName: get(album, 'attributes.artistName'),
    }
  })
}

export const transformAlbumDetailToSpotify = album => {
  const rawTracks = get(album, 'relationships.tracks.data')

  album.tracks = {}
  album.tracks.items = rawTracks.map(track => {
    const url = get(track, 'attributes.artwork.url')
    let image = url.replace('{w}', '80')
    image = image.replace('{h}', '80')

    return {
      id: track.id,
      name: get(track, 'attributes.name'),
      images: [{ url: image }],
      artists: [
        {
          name: get(track, 'attributes.artistName'),
          ...track.relationships.artists[0],
        },
      ],
    }
  })

  const url = get(album, 'attributes.artwork.url')
  let image = url.replace('{w}', '80')
  image = image.replace('{h}', '80')

  album.name = get(album, 'attributes.name')
  album.images = [{ url: image }]

  return album
}

export const transformArtistDetailToSpotify = artist => {
  const rawTracks = get(artist, 'relationships.songs.data')

  return rawTracks.map(track => {
    const url = get(track, 'attributes.artwork.url')
    let image = url.replace('{w}', '80')
    image = image.replace('{h}', '80')

    return {
      id: track.id,
      name: get(track, 'attributes.name'),
      images: [{ url: image }],
      artists: [
        {
          name: get(track, 'attributes.artistName'),
          id: artist.id,
          ...artist.attributes,
        },
      ],
    }
  })
}
