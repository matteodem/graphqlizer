import { check, Match } from 'meteor/check'

const generateResolverForFields = fields => Object.keys(fields).reduce((acc, fieldKey) => {
  const field = fields[fieldKey]

  if (field.resolve) {
    acc[fieldKey] = field.resolve
  }

  return acc
}, {})

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

      return collection.find({ }, {
        limit,
        skip: offset,
        graphqlFilters: filters,
        graphqlContext: context,
      }).fetch()
    },
    [`get${type}`](_, args, context) {
      const { _id, filters } = args

      check(_id, Match.Maybe(String))
      check(filters, Match.Maybe(Array))

      return collection.findOne(_id ? { _id } : {}, {
        graphqlFilters: filters,
        graphqlContext: context,
      })
    },
  } : {},
  Mutation: {
    ...(crud.create ? {
      [`create${type}`](_, args, context) {
        // TODO: pass context
        const data = { ...args.data }
        check(data, inputSchema)

        const _id = collection.insert(data)
        return collection.findOne({ _id })
      },
    } : {}),
    ...(crud.update ? {
      [`update${type}`](_, args, context) {
        // TODO: pass context
        const { _id } = args
        const data = { ...args.data }

        check(_id, String)
        check(data, inputSchema)

        collection.update({ _id }, { $set: data })
        return collection.findOne({ _id })
      },
    } : {}),
    ...(crud.delete ? {
      [`delete${type}`](_, args, context) {
        // TODO: pass context
        const { _id } = args
        check(_id, String)

        const doc = collection.findOne({ _id })

        collection.remove({ _id })

        return doc
      }
    } : {}),
  },
})
