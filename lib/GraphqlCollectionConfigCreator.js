import { mergeTypeFields, mapSchemaToTypeFields } from './TypeFieldsStructureMapper'
import { generateResolvers } from './ResolversGenerator'
import { generateTypeDef } from './TypeDefGenerator'

const defaultConfig = {
  crud: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  fields: {},
}

const enhanceWithDefaultConfig = c => ({
  ...defaultConfig,
  ...c,
  crud: {
    ...defaultConfig.crud,
    ...c.crud,
  },
})

export const createCollectionSchema = config => {
  const {
    type,
    schema,
    collection,
    crud,
    fields,
  } = enhanceWithDefaultConfig(config)

  let schemaConfig = schema

  if (schemaConfig instanceof SimpleSchema) {
    schemaConfig = {
      type: schema,
      input: schema,
    }
  }

  const typeFields = mergeTypeFields(mapSchemaToTypeFields(schemaConfig.type), fields.type)
  const inputFields = mergeTypeFields(mapSchemaToTypeFields(schemaConfig.input), fields.input)

  return {
    resolvers: generateResolvers({ typeFields, inputFields, type, crud }),
    typeDefs: [generateTypeDef({ typeFields, inputFields, type, crud })],
  }
}
