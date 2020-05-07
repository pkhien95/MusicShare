import { createSelector } from 'reselect'
import { HOME_SCREEN_ITEM_TYPE } from '../constants'
import { SOURCE } from '../../../constants'

const getSource = state => state.app.source

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
  source,
) => {
  const homeItems = items.map(({ type, id }) => {
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

  return homeItems.filter(
    item =>
      item.source === source || (source === SOURCE.spotify && !item.source),
  )
}

export const itemSelector = createSelector(
  getAlbumEntities,
  getTrackEntities,
  getArtistEntities,
  getCurrentItems,
  getSource,
  transformItems,
)
