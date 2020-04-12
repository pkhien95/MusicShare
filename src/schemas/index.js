import { schema } from 'normalizr'

const artistSchema = new schema.Entity(
  'artists',
  {},
  {
    processStrategy: (value, parent, key) => {
      if (key === 'artists') {
        return { ...value, [`${parent.type}s`]: [parent.id] }
      }
      return { ...value }
    },
    mergeStrategy: (entityA, entityB) => ({
      ...entityA,
      ...entityB,
      tracks: [...(entityA.tracks || []), ...(entityB.tracks || [])],
      albums: [...(entityA.albums || []), ...(entityB.albums || [])],
    }),
  },
)

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
