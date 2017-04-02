const typeMap = {
  [String]: 'String',
  [Boolean]: 'Boolean',
  [Number]: 'Int', // TODO: float?
}

// TODO: other simple schema keys: optional etc.
const getFieldDescription = def => ({
  type: typeMap[def.type],
})

export const mapSchemaToTypeFields = schema => Object.keys(schema.schema()).reduce(
  (acc, field) => ({ ...acc, [field]: getFieldDescription(schema.schema(field)) }),
  {}
)

export const mergeTypeFields = (defaultFields, customFields = {}) => Object
  .keys(defaultFields)
  .reduce(
    (acc, field) => customFields[field] === false ? acc : ({
      ...acc,
      [field]: ({ ...defaultFields[field], ...customFields[field] })
     }),
    {}
  )
