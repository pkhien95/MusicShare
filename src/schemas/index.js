import { schema } from 'normalizr'

const artistSchema = new schema.Entity('artists')

const albumSchema = new schema.Entity('albums', {
  artists: [artistSchema],
})

export { albumSchema, artistSchema }
