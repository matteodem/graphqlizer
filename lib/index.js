import { createCollectionSchema } from './GraphqlCollectionConfigCreator'

const baseTypeDef = `
input FilterInput {
  key: String!
  value: String!
}

type Query {}
type Mutation {}

schema: {
  query: Query
  mutation: Mutation
}
`

const generateTypeDefsAndResolvers = ({ schemas }) => {
  return {
    typeDefs: [
      baseTypeDef,
      ...schemas.reduce(
        (acc, { typeDefs }) => [...acc, ...typeDefs],
        [],
      ),
    ],
    resolvers: {
      ...schemas.reduce((acc, { resolvers }) => ({ ...acc, ...resolvers }), {}),
      Query: {
        ...schemas.reduce((acc, { resolvers: { Query } }) => ({ ...acc, ...Query }), {}),
      },
      Mutation: {
        ...schemas.reduce((acc, { resolvers: { Mutation } }) => ({ ...acc, ...Mutation }), {}),
      },
    },
  }
};

export {
  createCollectionSchema,
  generateTypeDefsAndResolvers,
};
