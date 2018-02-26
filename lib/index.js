import { typeDef } from './api/typeDef'
import { typeDefs } from './api/typeDefs'
import { resolver } from './api/resolver'
import { resolvers } from './api/resolvers'
import { crud } from './api/crud'
import { registerType } from './TypeFieldsStructureMapper'
import { generateTypeDefsAndResolvers } from './api/generateTypeDefsAndResolvers'
// deprecated
import { createCollectionSchema } from './GraphqlCollectionConfigCreator'

export {
  generateTypeDefsAndResolvers,
  typeDefs,
  resolvers,
  typeDef,
  resolver,
  crud,
  registerType,
  /**
   * @deprecated Use methods listed above instead
   */
  createCollectionSchema,
};
