import { createCollectionSchema } from './GraphqlCollectionConfigCreator'
import { typeDef } from './api/typeDef'
import { typeDefs } from './api/typeDefs'
import { generateTypeDefsAndResolvers } from './api/generateTypeDefsAndResolvers'

const baseTypeDef = `
input FilterInput {
  key: String!
  value: String!
}

type Query {
  # Initial mutation to provide a base query
  graphqlizePing: Boolean
}

type Mutation {
  # Initial mutation to provide a base mutation
  graphqlizeMutatePing: Boolean
}

schema {
  query: Query
  mutation: Mutation
}
`

const resolvers = () => {}
const resolver = {
  create: () => {},
  read: () => {},
  update: () => {},
  delete: () => {},
}

const crud = () => {
  return {
    resolvers: resolvers(),
    typeDefs: typeDefs(),
  }
}

export {
  createCollectionSchema,
  /**
   * @deprecated Use composable methods listed below instead
   */
  generateTypeDefsAndResolvers,
  // new API
  typeDefs,
  resolvers,
  typeDef,
  resolver,
  crud,
};
