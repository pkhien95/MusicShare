import { createSelector } from 'reselect'
import { get } from 'lodash'

const getTrackEntities = state => state.entities.tracks

const getArtistEntities = state => state.entities.artists

const getSelectedArtistId = (_, ownProps) => ownProps.route.params.id

export const artistSelector = createSelector(
  getArtistEntities,
  getSelectedArtistId,
  (entities, id) => entities[id],
)

const getTracksFromArtist = (artist, trackEntities, artistEntities) => {
  return get(artist, 'tracks', []).map(id => ({
    ...trackEntities[id],
    artists: get(trackEntities[id], 'artists', []).map(
      artistId => artistEntities[artistId],
    ),
  }))
}

export const tracksSelector = createSelector(
  artistSelector,
  getTrackEntities,
  getArtistEntities,
  getTracksFromArtist,
)

const getAppleTracksFromArtist = (artist, trackEntities) => {
  return get(artist, 'tracks', []).map(id => ({
    ...trackEntities[id],
    artists: [{ name: get(trackEntities[id], 'artistName', []) }],
  }))
}

export const appleTrackSelector = createSelector(
  artistSelector,
  getTrackEntities,
  getAppleTracksFromArtist,
)
