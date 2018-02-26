import { generateResolvers } from '../lib/ResolversGenerator'
import { defaultCrud, fieldsConfig, inputSimpleSchema, fakeCollectionForResolvers } from './testData'

Tinytest.add('Graphqlizer - ResolversGenerator - list', function (test) {
  const resolvers = generateResolvers({
    type: 'Book',
    crud: defaultCrud,
    inputSchema: inputSimpleSchema,
    collection: fakeCollectionForResolvers(test),
    ...fieldsConfig,
  })

  test.isUndefined(resolvers.Book.age)
  test.equal(resolvers.Book.fullName({ firstName: 'Matt', lastName: 'Wow' }), 'Matt Wow')

  test.equal(
    resolvers.Query.getBook(
      null,
      { _id: 'getsingleId', filters: [{ key: 'test', value: 'wowzia' }] },
    ),
    'getBook',
  )

  test.equal(
    resolvers.Query.listBook(
      null,
      { limit: 10, offset: 5, filters: [{ key: 'category', value: 'woww' }] },
      { userId: 'wazooba' },
    ),
    'listBook',
  )

  test.equal(
    resolvers.Mutation.createBook(
      null,
      { data: { username: 'matt', age: 21, firstName: 'mattaya' } },
    ),
    'getBook'
  )

  try {
    resolvers.Mutation.createBook(
      null,
      { data: { foo: 'bar' } },
    )
    test.fail()
  } catch (e) {
  }

  test.equal(
    resolvers.Mutation.updateBook(
      null,
      { _id: 'idDocUpdate', data: { username: 'mattnew', age: 20 } },
    ),
    'getBook',
  )

  test.equal(
    resolvers.Mutation.deleteBook(
      null,
      { _id: 'idDocToRemove' },
    ),
    'getBook',
  )
})

Tinytest.add('Graphqlizer - ResolversGenerator - Only Create', function (test) {
  const resolvers = generateResolvers({
    type: 'Book',
    crud: {
      create: true,
    },
    inputSchema: inputSimpleSchema,
    collection: {},
    ...fieldsConfig,
  })

  test.isUndefined(resolvers.Query.getBook)
  test.isUndefined(resolvers.Query.listBook)
  test.isUndefined(resolvers.Mutation.updateBook)
  test.isUndefined(resolvers.Mutation.deleteBook)
  test.equal(typeof resolvers.Mutation.createBook, 'function')
})
