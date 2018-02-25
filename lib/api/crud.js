import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

export const crud = (name, collection, customSchema) => {
  const schema = customSchema || collection.simpleSchema()

  return {
    typeDefs: typeDefs(name, schema),
    resolvers: resolvers(name, collection, schema),
  }
}
