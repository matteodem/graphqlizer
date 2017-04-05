import { generateResolvers } from '../lib/ResolversGenerator'
import { defaultCrud, fieldsConfig } from './testData'

Tinytest.add('Graphqlizer - ResolversGenerator - list', function (test) {
  const resolvers = generateResolvers({
    type: 'Book',
    crud: defaultCrud,
    collection: {
      insert() {
        return 'createBook'
      },
      update() {
        return 'updateBook'
      },
      delete() {
        return 'deleteBook'
      },
      find() {
        return 'listBook'
      },
      findOne(selector, opts) {
        test.equal(selector._id, 'getsingleId')
        test.equal(opts.graphqlFilters[0].key, 'test')
        test.equal(opts.graphqlFilters[0].value, 'wowzia')
        return 'getBook'
      },
    },
    ...fieldsConfig,
  })

  test.isUndefined(resolvers.Book.age)
  test.equal(resolvers.Book.fullName({ firstName: 'Matt', lastName: 'Wow' }), 'Matt Wow')

  test.equal(
    resolvers.Query.getBook(
      null,
      { _id: 'getsingleId', filters: [{ key: 'test', value: 'wowzia' }] },
    ),
    'getBook'
  )
  // TODO: test listUser and rest of crud
});
