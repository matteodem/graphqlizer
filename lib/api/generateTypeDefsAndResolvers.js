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

const reduceSchema = (schemas, reducer, initialSchema) => schemas.reduce(reducer, initialSchema)

export const generateTypeDefsAndResolvers = ({ schemas }) => {
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
        ...reduceSchema(schemas, (acc, { resolvers: { Query } }) => ({ ...acc, ...Query }), {
          graphqlizePing: () => true,
        }),
      },
      Mutation: {
        ...reduceSchema(schemas, (acc, { resolvers: { Mutation } }) => ({ ...acc, ...Mutation }), {
          graphqlizeMutatePing: () => true,
        }),
      },
    },
  }
}
