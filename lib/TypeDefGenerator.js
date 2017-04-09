const mapFields = fields => Object
  .keys(fields)
  .filter(key => key.slice(-2) !== '.$')
  .map(key => `  ${key}: ${fields[key].type}`)
  .join('\n')

export const generateTypeDef = ({ typeFields, inputFields, type, crud }) =>
  `
type ${type} {
  _id: String!
${mapFields(typeFields)}
}

input ${type}Input {
${mapFields(inputFields)}
}

extend type Query {${crud.read ? `
  list${type}(limit: Int, offset: Int, filters: [FilterInput]): [${type}]
  get${type}(_id: String, filters: [FilterInput]): ${type}` : ''}
}

extend type Mutation {${crud.create ? `
  create${type}(data: ${type}Input!): ${type}` : ''}${
  crud.update ? `
  update${type}(_id: String!, data: ${type}Input!): ${type}` : ''}${
  crud.delete ? `
  delete${type}(_id: String!): ${type}` : ''}
}
`

