import { check, Match } from 'meteor/check'

const generateResolverForFields = fields => Object.keys(fields).reduce((acc, fieldKey) => {
  const field = fields[fieldKey]

  if (field.resolve) {
    acc[fieldKey] = field.resolve
  }

  return acc
}, {})

const callWithGraphqlData = (collection, data, cb) => {
  Object.keys(data).forEach(key => collection[key] = data[key])

  const res = cb()

  Object.keys(data).forEach(key => collection[key] = null)

  return res
};

export const generateResolvers = ({
                                    type,
                                    crud,
                                    collection,
                                    typeFields,
                                    inputFields,
                                    inputSchema,
                                  }) => ({
  [type]: generateResolverForFields(typeFields),
  Query: crud.read ? {
    [`list${type}`](_, args, context) {
      const { limit, offset, filters } = args

      check(limit, Match.Maybe(Number))
      check(offset, Match.Maybe(Number))
      check(filters, Match.Maybe(Array))

      return callWithGraphqlData(collection, {
        graphqlFilters: filters,
        graphqlContext: context,
      }, () => collection.find({ }, { limit, skip: offset }).fetch())
    },
    [`get${type}`](_, args, context) {
      const { _id, filters } = args

      check(_id, Match.Maybe(String))
      check(filters, Match.Maybe(Array))

      return callWithGraphqlData(collection, {
        graphqlFilters: filters,
        graphqlContext: context,
      }, () => collection.findOne(_id ? { _id } : {}))
    },
  } : {},
  Mutation: {
    ...(crud.create ? {
      [`create${type}`](_, args, context) {
        const data = { ...args.data }
        check(data, inputSchema)

        const _id = callWithGraphqlData(collection, {
          graphqlContext: context,
        }, () => collection.insert(data))

        return collection.findOne({ _id })
      },
    } : {}),
    ...(crud.update ? {
      [`update${type}`](_, args, context) {
        const { _id } = args
        const data = { ...args.data }

        check(_id, String)
        check(data, inputSchema)

        callWithGraphqlData(collection, {
          graphqlContext: context,
        }, () => collection.update({ _id }, { $set: data }))

        return collection.findOne({ _id })
      },
    } : {}),
    ...(crud.delete ? {
      [`delete${type}`](_, args, context) {
        const { _id } = args
        check(_id, String)

        const doc = collection.findOne({ _id })

        callWithGraphqlData(collection, {
          graphqlContext: context,
        }, () => collection.remove({ _id }))

        return doc
      }
    } : {}),
  },
})
