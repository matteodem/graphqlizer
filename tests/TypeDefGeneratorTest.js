import { generateTypeDef } from '../lib/TypeDefGenerator'
import { defaultCrud, fieldsConfig } from './testData'

Tinytest.add('Graphqlizer - TypeDefGenerator - All', function (test) {
  const userTypeDefAll = generateTypeDef({
    crud: defaultCrud,
    type: 'User',
    ...fieldsConfig,
  })

  test.equal(userTypeDefAll, `
type User {
  _id: String!
  username: String!
  fullName: String
  age: Int
}

input UserInput {
  username: String!
  firstName: String
  lastName: String
  enabled: Boolean
  age: Int
}

extend type Query {
  listUser(limit: Int, offset: Int, filters: [FilterInput]): [User]
  getUser(_id: String, filters: [FilterInput]): User
}

extend type Mutation {
  createUser(data: UserInput!): User
  updateUser(_id: String!, data: UserInput!): User
  deleteUser(_id: String!): User
}
`)
})


Tinytest.add('Graphqlizer - TypeDefGenerator - No CRUD', function (test) {
  const userTypeDefNothing = generateTypeDef({
    crud: {},
    type: 'User',
    ...fieldsConfig,
  })

  test.equal(userTypeDefNothing, `
type User {
  _id: String!
  username: String!
  fullName: String
  age: Int
}

input UserInput {
  username: String!
  firstName: String
  lastName: String
  enabled: Boolean
  age: Int
}

extend type Query {
}

extend type Mutation {
}
`)
})
Tinytest.add('Graphqlizer - TypeDefGenerator - Only read', function (test) {
  const userTypeDefNothing = generateTypeDef({
    crud: {
      read: true,
    },
    type: 'User',
    ...fieldsConfig,
  })

  test.equal(userTypeDefNothing, `
type User {
  _id: String!
  username: String!
  fullName: String
  age: Int
}

input UserInput {
  username: String!
  firstName: String
  lastName: String
  enabled: Boolean
  age: Int
}

extend type Query {
  listUser(limit: Int, offset: Int, filters: [FilterInput]): [User]
  getUser(_id: String, filters: [FilterInput]): User
}

extend type Mutation {
}
`)
})
