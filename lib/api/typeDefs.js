import { typeDef } from './typeDef'

export const typeDefs = (name, schema) => {
  return [
    typeDef.type,
    typeDef.input,
    typeDef.mutationCreate,
    typeDef.mutationUpdate,
    typeDef.mutationDelete,
    typeDef.queryGet,
    typeDef.queryList,
  ].map(func => func(name, schema))
}
