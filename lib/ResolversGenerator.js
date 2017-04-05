import { check, Match } from 'meteor/check'

const generateResolverForFields = fields => Object.keys(fields).reduce((acc, fieldKey) => {
  const field = fields[fieldKey]

  if (field.resolve) {
    acc[fieldKey] = field.resolve
  }

  return acc
}, {})

export const generateResolvers = ({ type, crud, collection, typeFields, inputFields }) => ({
  [type]: generateResolverForFields(typeFields),
  Query: crud.read ? {
    [`list${type}`](_, args) {
      check(args.limit, Match.Maybe(Number))
      check(args.offset, Match.Maybe(Number))
      check(args.filters, Match.Maybe(Array))


    },
    [`get${type}`](_, args) {
      const { _id, filters } = args

      check(_id, String)
      check(filters, Match.Maybe(Array))

      return collection.findOne({ _id }, { graphqlFilters: filters })
    },
  } : {},
  Mutation: {},
})
