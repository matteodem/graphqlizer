import {
  createCollectionSchema,
} from '../lib/GraphqlCollectionConfigCreator'

const collectionMock = {
  find: (selector, { limit }) => `find:${limit}`,
  findOne: ({ _id }) => `findOne:${_id}`,
  insert: ({ age }) => `insert:${age}`,
  update: ({ _id }, { $set: { age } }) => `update:${_id}:${age}`,
  remove: ({ _id }) => `delete:${_id}`,
}

Tinytest.add('Graphqlizer - CollectionConfigCreator - Simple', function (test) {
  const { typeDefs, resolvers } = createCollectionSchema({
    type: 'Alien',
    collection: collectionMock,
    schema: new SimpleSchema({
      age: {
        type: Number,
      },
      alienname: {
        type: String,
      },
      tags: {
        type: [String],
        optional: true,
      },
    }),
  })

  test.equal(typeDefs[0],  `
type Alien {
  _id: String!
  age: Int!
  alienname: String!
  tags: [String]
}

input AlienInput {
  age: Int!
  alienname: String!
  tags: [String]
}

extend type Query {
  listAlien(limit: Int, offset: Int, filters: [FilterInput]): [Alien]
  getAlien(_id: String, filters: [FilterInput]): Alien
}

extend type Mutation {
  createAlien(data: AlienInput!): Alien
  updateAlien(_id: String!, data: AlienInput!): Alien
  deleteAlien(_id: String!): Alien
}
`)

  test.isUndefined(resolvers.Alien.age)
  test.equal(resolvers.Query.listAlien(null, { limit: 10 }), 'find:10')
  test.equal(resolvers.Query.getAlien(null, { _id: 'anId' }), 'findOne:anId')

  try {
    resolvers.Mutation.createAlien(null, { data: { foo: 'bar' } })
    test.fail()
  } catch (e) {}

  test.equal(
    resolvers.Mutation.createAlien(null, { data: { age: 311, alienname: 'Wow' } }),
    'insert:311',
  )

  test.equal(
    resolvers.Mutation.updateAlien(null, { _id: 'updateId', data: { age: 315, alienname: 'Wow' } }),
    'update:updateId:315',
  )

  test.equal(
    resolvers.Mutation.deleteAlien(null, { _id: 'deleteId' }),
    'delete:deleteId',
  )
})

Tinytest.add('Graphqlizer - CollectionConfigCreator - Complex', function (test) {
  const { typeDefs, resolvers } = createCollectionSchema({
    type: 'Alien',
    collection: collectionMock,
    crud: {
      delete: false,
    },
    schema: {
      input: new SimpleSchema({
        age: {
          type: Number,
        },
        alienname: {
          type: String,
        },
        tags: {
          type: [String],
          optional: true,
        },
      }),
      type: new SimpleSchema({
        age: {
          type: Number,
        },
        alienname: {
          type: String,
        },
        tagsAsString: {
          type: String,
          optional: true,
        },
        tags: {
          type: [String],
          optional: true,
        },
        ignoreThis: {
          type: Object,
        },
      })
    },
    fields: {
      type: {
        reallyCustomField: {
          type: 'Custom',
          resolve(root) {
            return root.customField
          },
        },
        ignoreThis: false,
      },
    }
  })

  test.equal(typeDefs[0],  `
type Alien {
  _id: String!
  age: Int!
  alienname: String!
  tagsAsString: String
  tags: [String]
  reallyCustomField: Custom
}

input AlienInput {
  age: Int!
  alienname: String!
  tags: [String]
}

extend type Query {
  listAlien(limit: Int, offset: Int, filters: [FilterInput]): [Alien]
  getAlien(_id: String, filters: [FilterInput]): Alien
}

extend type Mutation {
  createAlien(data: AlienInput!): Alien
  updateAlien(_id: String!, data: AlienInput!): Alien
}
`)

  test.isUndefined(resolvers.Alien.age)
  test.equal(resolvers.Query.listAlien(null, { limit: 10 }), 'find:10')
  test.equal(resolvers.Query.getAlien(null, { _id: 'anId' }), 'findOne:anId')

  try {
    resolvers.Mutation.createAlien(null, { data: { foo: 'bar' } })
    test.fail()
  } catch (e) {}

  test.equal(
    resolvers.Mutation.createAlien(null, { data: { age: 299, alienname: 'Wow' } }),
    'insert:299',
  )

  test.equal(
    resolvers.Mutation.updateAlien(null, { _id: 'updateI', data: { age: 309, alienname: 'Wow' } }),
    'update:updateI:309',
  )

  test.isUndefined(resolvers.Mutation.deleteAlien)
})
