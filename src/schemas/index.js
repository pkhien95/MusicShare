import { schema } from 'normalizr'

const artistSchema = new schema.Entity('artists')

const trackSchema = new schema.Entity('tracks', {
  artists: [artistSchema],
})

const albumSchema = new schema.Entity('albums', {
  artists: [artistSchema],
  tracks: {
    items: [trackSchema],
  },
})

export { albumSchema, artistSchema, trackSchema }
