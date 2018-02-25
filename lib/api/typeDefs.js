import { typeDef } from './typeDef'

export const typeDefs = (name, schema) => {
  return [
    typeDef.type,
    typeDef.input,
    typeDef.create,
    typeDef.update,
    typeDef.delete,
    typeDef.get,
    typeDef.list,
  ].map(func => func(name, schema))
}
