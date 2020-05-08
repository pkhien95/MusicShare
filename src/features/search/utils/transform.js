import { get } from 'lodash'
import { SOURCE } from '../../../constants'
import Axios from 'axios'

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
      artistName: get(album, 'attributes.artistName'),
      type: 'album',
      source: SOURCE.spotify,
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
      ...track.attributes,
      images: [{ url: image }],
      artists: [
        {
          name: get(track, 'attributes.artistName'),
          ...album.relationships.artists.data[0],
        },
      ],
      type: 'track',
      source: SOURCE.appleMusic,
    }
  })

  const url = get(album, 'attributes.artwork.url')
  let image = url.replace('{w}', '80')
  image = image.replace('{h}', '80')

  album.name = get(album, 'attributes.name')
  album.images = [{ url: image }]
  album.type = 'album'
  album.source = SOURCE.appleMusic

  return album
}

export const transformArtistDetailToSpotify = async artist => {
  const rawTracks = get(artist, 'relationships.songs.data')

  const artistUrl = get(artist, 'attributes.url')
  const artistImageUrl = await getArtistImage(artistUrl)
  let artistImage = artistImageUrl.replace('{w}', '80')
  artistImage = artistImage.replace('{h}', '80')

  return rawTracks.map(track => {
    const url = get(track, 'attributes.artwork.url')
    let image = url.replace('{w}', '80')
    image = image.replace('{h}', '80')

    return {
      id: track.id,
      ...track.attributes,
      images: [{ url: image }],
      artists: [
        {
          id: artist.id,
          ...artist.attributes,
          images: [{ url: artistImage }],
          tracks: [track.id],
        },
      ],
      type: 'track',
      source: SOURCE.appleMusic,
    }
  })
}

const getArtistImage = artistUrl => {
  return Axios.get(artistUrl).then(response => {
    const html = response.data
    const ogImage = html.match(
      /<meta property=\"og:image\" content=\"(.*png)\"/,
    )[1]
    return ogImage.replace(/[\d]+x[\d]+/, '{w}x{h}')
  })
}
