import { resolver } from './resolver'

export const resolvers = (name, collection, customSchema) => ({
  [`get${name}`]: resolver.get(collection, customSchema),
  [`list${name}`]: resolver.list(collection, customSchema),
  [`create${name}`]: resolver.create(collection, customSchema),
  [`update${name}`]: resolver.update(collection, customSchema),
  [`delete${name}`]: resolver.delete(collection, customSchema),
})
