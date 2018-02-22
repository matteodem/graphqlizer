import {
  typeDefs,
  typeDef,
} from '../lib'

const alienSchema = new SimpleSchema({
  age: {
    type: Number,
  },
  name: {
    type: String,
  },
  species: {
    type: String,
    optional: true,
  },
})

const userSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  hasName: {
    type: Boolean,
    optional: true,
  },
})

Tinytest.add('Graphqlizer - Public API - typeDef', function (test) {
  test.equal(typeDef.input('Alien', alienSchema), `input AlienInput {
  age: Int!
  name: String!
  species: String
}`)

  test.equal(typeDef.type('Alien', alienSchema), `type Alien {
  _id: String!
  age: Int!
  name: String!
  species: String
}`)

  test.equal(typeDef.mutationCreate('Alien'), `extend type Mutation {
  createAlien(data: AlienInput!): Alien
}`)

  test.equal(typeDef.mutationUpdate('Alien'), `extend type Mutation {
  updateAlien(_id: String!, data: AlienInput!): Alien
}`)

  test.equal(typeDef.mutationDelete('Alien'), `extend type Mutation {
  deleteAlien(_id: String!): Alien
}`)

  test.equal(typeDef.queryGet('Alien'), `extend type Query {
  getAlien(_id: String): Alien
}`)

  test.equal(typeDef.queryList('Alien'), `extend type Query {
  listAlien(limit: Int, offset: Int): [Alien]
}`)
})

Tinytest.add('Graphqlizer - Public API - typeDefs', function (test) {
  test.equal(typeDefs('Alien', alienSchema), [`type Alien {
  _id: String!
  age: Int!
  name: String!
  species: String
}`, `input AlienInput {
  age: Int!
  name: String!
  species: String
}`, `extend type Mutation {
  createAlien(data: AlienInput!): Alien
}`, `extend type Mutation {
  updateAlien(_id: String!, data: AlienInput!): Alien
}`,`extend type Mutation {
  deleteAlien(_id: String!): Alien
}`, `extend type Query {
  getAlien(_id: String): Alien
}`, `extend type Query {
  listAlien(limit: Int, offset: Int): [Alien]
}`])

  test.equal(typeDefs('User', userSchema), [`type User {
  _id: String!
  firstName: String!
  lastName: String!
  hasName: Boolean
}`, `input UserInput {
  firstName: String!
  lastName: String!
  hasName: Boolean
}`, `extend type Mutation {
  createUser(data: UserInput!): User
}`, `extend type Mutation {
  updateUser(_id: String!, data: UserInput!): User
}`,`extend type Mutation {
  deleteUser(_id: String!): User
}`, `extend type Query {
  getUser(_id: String): User
}`, `extend type Query {
  listUser(limit: Int, offset: Int): [User]
}`])
})

