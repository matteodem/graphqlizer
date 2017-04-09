const typeMap = {
  [String]: 'String',
  [Boolean]: 'Boolean',
  [Number]: 'Int',
}

const getSingularTypeString = ({ type, decimal }) => {
  if (type === Number && decimal) {
    return 'Float'
  }

  const singularType = typeMap[type]

  if (!singularType) {
    throw new Error(`Type not found for "${type.toString()}"`)
  }

  return singularType
}

const getTypeString = ({ type, decimal, optional }, multipleFieldType) => {
  const isMultipleType = !!multipleFieldType
  const openingBracket = isMultipleType ? '[' : ''
  const closingBracket = isMultipleType ? ']' : ''

  if (isMultipleType) {
    type = multipleFieldType.type
  }

  const singleType = getSingularTypeString({ type, decimal })

  return `${openingBracket}${singleType}${closingBracket}${optional ? '' : '!'}`
}

const getFieldDescription = (def, multipleFieldType) => ({
  type: getTypeString(def, multipleFieldType),
})

export const mapSchemaToTypeFields = (schema, customFields = {}) => Object
  .keys(schema.schema())
  .reduce(
    (acc, field) => ({
      ...acc,
      ...(customFields[field] === false ? {} : {
        [field]: customFields[field] ? customFields[field] : getFieldDescription(
          schema.schema(field),
          schema.schema(`${field}.$`)
        ),
      }),
    }),
    {},
  )
