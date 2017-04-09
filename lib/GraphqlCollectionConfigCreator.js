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

  const typeSchema = schemaConfig.type
  const inputSchema = schemaConfig.input

  const typeFields = mapSchemaToTypeFields(typeSchema, fields.type)
  const inputFields = mapSchemaToTypeFields(inputSchema, fields.input)

  return {
    resolvers: generateResolvers({
      typeFields,
      inputFields,
      inputSchema,
      type,
      collection,
      crud,
    }),
    typeDefs: [generateTypeDef({ typeFields, inputFields, type, crud })],
  }
}
