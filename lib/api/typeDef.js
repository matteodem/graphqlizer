import { mapSchemaToTypeFields } from '../TypeFieldsStructureMapper'

export const mapFields = fields => Object
  .keys(fields)
  .filter(key => key.slice(-2) !== '.$')
  .map(key => `  ${key}: ${fields[key].type}`)
  .join('\n')

const extendOperation = operationType => operation => `extend type ${operationType} {
  ${operation}
}`

const extendQuery = extendOperation('Query')
const extendMutation = extendOperation('Mutation')

export const typeDef = {
  input: (name, schema) => {
    const inputFields = mapSchemaToTypeFields(schema)

    return `input ${name}Input {
${mapFields(inputFields)}
}`
  },
  type: (name, schema, withId = true) => {
    const typeFields = mapSchemaToTypeFields(schema)

    return `type ${name} {
  ${(withId ? '_id: String!' : '')}
${mapFields(typeFields)}
}`
  },
  get: name => extendQuery(
    `get${name}(_id: String): ${name}`
  ),
  list: name => extendQuery(
    `list${name}(limit: Int, offset: Int): [${name}]`
  ),
  create: name => extendMutation(
    `create${name}(data: ${name}Input!): ${name}`,
  ),
  update: name => extendMutation(
    `update${name}(_id: String!, data: ${name}Input!): ${name}`,
  ),
  delete: name => extendMutation(
    `delete${name}(_id: String!): ${name}`,
  ),
}
