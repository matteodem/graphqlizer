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

};

export {
  createCollectionSchema,
  generateTypeDefsAndResolvers,
};
