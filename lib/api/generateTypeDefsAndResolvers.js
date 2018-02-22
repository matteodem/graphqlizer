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
}
