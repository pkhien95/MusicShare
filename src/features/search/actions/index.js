import * as ActionTypes from './action-types'

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
  type: ActionTypes.SPOTIFY_SEARCH_SUCCESS,
  payload: {
    error,
  },
})

export const searchReset = () => ({
  type: ActionTypes.SEARCH_RESET
})
