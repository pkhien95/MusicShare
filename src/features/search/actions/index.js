import * as ActionTypes from './action-types'
import { SOURCE } from '../../../constants'

export const spotifySearchRequest = (
  keywords: string,
  types: string,
  limit: number,
  offset: number,
) => ({
  type: ActionTypes.SPOTIFY_SEARCH_REQUEST,
  payload: {
    keywords,
    types,
    limit,
    offset,
  },
})

export const spotifySearchSuccess = (artists: any[], albums: any[]) => ({
  type: ActionTypes.SPOTIFY_SEARCH_SUCCESS,
  payload: {
    artists,
    albums,
  },
})

export const spotifySearchFailure = (error: any) => ({
  type: ActionTypes.SPOTIFY_SEARCH_FAILURE,
  payload: {
    error,
  },
})

export const appleMusicSearchRequest = (
  keywords: string,
  types: string,
  limit: number,
  offset: number,
) => ({
  type: ActionTypes.APPLE_MUSIC_SEARCH_REQUEST,
  payload: {
    keywords,
    types,
    limit,
    offset,
  },
})

export const appleMusicSearchSuccess = (artists: any[], albums: any[]) => ({
  type: ActionTypes.APPLE_MUSIC_SEARCH_SUCCESS,
  payload: {
    artists,
    albums,
  },
})

export const appleMusicSearchFailure = (error: any) => ({
  type: ActionTypes.APPLE_MUSIC_SEARCH_FAILURE,
  payload: {
    error,
  },
})

export const searchRequest = (
  source: string = SOURCE.spotify,
  keywords: string,
  types: string,
  limit: number,
  offset: number,
) => {
  switch (source) {
    case SOURCE.appleMusic:
      return appleMusicSearchRequest(keywords, types, limit, offset)
    default:
      return spotifySearchRequest(keywords, types, limit, offset)
  }
}

export const searchReset = () => ({
  type: ActionTypes.SEARCH_RESET,
})
