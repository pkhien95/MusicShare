import { createSelector } from 'reselect'
import { HOME_SCREEN_ITEM_TYPE } from '../constants'

const getAlbumEntities = state => state.entities.albums

const getTrackEntities = state => state.entities.tracks

const getArtistEntities = state => state.entities.artists

const getCurrentItems = state => state.home

const mapItemWithArtists = (item, artistEntities) => {
  return item.artists.map(id => artistEntities[id])
}

const transformItems = (
  albumEntities,
  trackEntities,
  artistEntities,
  items,
) => {
  return items.map(({ type, id }) => {
    if (type === HOME_SCREEN_ITEM_TYPE.ALBUM) {
      return {
        ...albumEntities[id],
        artists: mapItemWithArtists(albumEntities[id], artistEntities),
      }
    }
    return {
      ...trackEntities[id],
      artists: mapItemWithArtists(trackEntities[id], artistEntities),
    }
  })
}

export const itemSelector = createSelector(
  getAlbumEntities,
  getTrackEntities,
  getArtistEntities,
  getCurrentItems,
  transformItems,
)
