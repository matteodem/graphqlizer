import { createCollectionSchema } from './GraphqlCollectionConfigCreator'

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
        ...schemas.reduce((acc, { resolvers: { Query } }) => ({ ...acc, ...Query }), {
          graphqlizePing: () => true,
        }),
      },
      Mutation: {
        ...schemas.reduce((acc, { resolvers: { Mutation } }) => ({ ...acc, ...Mutation }), {
          graphqlizeMutatePing: () => true,
        }),
      },
    },
  }
};

export {
  createCollectionSchema,
  generateTypeDefsAndResolvers,
};
