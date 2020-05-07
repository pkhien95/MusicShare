import { createSelector } from 'reselect'

const albumEntities = state => state.entities.albums

const searchedAlbums = state => state.search.albumIds

export const sourceSelector = state => state.app.source

const transformSearchedAlbum = (entities, ids) => {
  return ids.map(id => entities[id])
}

export const albumsSelector = createSelector(
  albumEntities,
  searchedAlbums,
  transformSearchedAlbum,
)

const artistEntities = state => state.entities.artists

const searchedArtists = state => state.search.artistIds

const transformSearchedArtists = (entities, ids) => {
  return ids.map(id => entities[id])
}

export const artistsSelector = createSelector(
  artistEntities,
  searchedArtists,
  transformSearchedArtists,
)
