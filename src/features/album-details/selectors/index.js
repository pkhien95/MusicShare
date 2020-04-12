import { createSelector } from 'reselect'
import { get } from 'lodash'

const getAlbumEntities = state => state.entities.albums

const getTrackEntities = state => state.entities.tracks

const getArtistEntities = state => state.entities.artists

const getSelectedAlbumId = (_, ownProps) => ownProps.route.params.id

export const albumSelector = createSelector(
  getAlbumEntities,
  getSelectedAlbumId,
  (entities, id) => entities[id],
)
//
// export const albumSelector = (state, ownProps) =>
//   getAlbumEntities(state)[ownProps.route.params.id]

const getArtistsFromAlbum = (album, artistEntities) => {
  return album.artists.map(id => artistEntities[id])
}

export const artistsSelector = createSelector(
  albumSelector,
  getArtistEntities,
  getArtistsFromAlbum,
)

const getTracksFromAlbum = (album, trackEntities, artistEntities) => {
  return get(album, 'tracks.items', []).map(id => ({
    ...trackEntities[id],
    artists: get(trackEntities[id], 'artists', []).map(
      artistId => artistEntities[artistId],
    ),
  }))
}

export const tracksSelector = createSelector(
  albumSelector,
  getTrackEntities,
  getArtistEntities,
  getTracksFromAlbum,
)
