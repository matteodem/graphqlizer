import { check, Match } from 'meteor/check'

const withSchema = func => (collection, customSchema) => {
  return func(collection, (customSchema || collection.simpleSchema()))
}

export const resolver = {
  get: (collection) => (root, args) =>  {
    const { _id } = args

    check(_id, Match.Maybe(String))

    return collection.findOne(_id ? { _id } : {})
  },
  list: (collection) => (root, args) => {
    const { limit, offset } = args

    check(limit, Match.Maybe(Number))
    check(offset, Match.Maybe(Number))

    return collection.find({ }, { limit, skip: offset }).fetch()
  },
  create: withSchema((collection, schema) => (root, args) => {
    const data = { ...args.data }
    check(data, schema)

    const _id = collection.insert(data)

    return collection.findOne({ _id })
  }),
  update: withSchema((collection, schema) => (root, args) => {
    const { _id } = args
    const data = { ...args.data }

    check(_id, String)
    check(data, schema)

    collection.update({ _id }, { $set: data })

    return collection.findOne({ _id })
  }),
  delete: withSchema((collection, schema) => (root, args) => {
    const { _id } = args
    check(_id, String)

    const doc = collection.findOne({ _id })

    collection.remove({ _id })

    return doc
  }),
}
