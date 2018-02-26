import {
  resolvers,
  resolver,
} from '../lib'
import {
  customSchema,
  fakeCollection,
} from './ResolverApiTestData'

Tinytest.add('Graphqlizer - Public API - resolver', function (test) {
  test.equal(
    resolver.create(fakeCollection)(
      null,
      {
        data: {
          _id: 'bookIdNice',
          age: 21,
          awesomeName: 'matt',
        },
      },
    ),
    ['getBook', { _id: 'bookIdNice' }],
  )

  test.equal(
    resolver.create(fakeCollection, customSchema)(
       null,
      {
        data: {
          _id: 'bookIdNiceWoo',
          age: 21,
          awesomeName: 'matt',
          secondAwesomeName: 'mattaya',
          isAwesome: true,
        },
      },
    ),
    ['getBook', { _id: 'bookIdNiceWoo' }],
  )

  try {
    resolver.create(fakeCollection, customSchema)(
       null,
      {
        data: {
          _id: 'bookIdNiceWoo2',
          age: 21,
          awesomeName: 'matt',
        },
      },
    )
    test.fail()
  } catch (e) {
  }

  test.equal(
    resolver.get(fakeCollection)(
      null,
      {
        _id: 'bookIdNice',
      },
    ),
    ['getBook', { _id: 'bookIdNice' }],
  )
})
Tinytest.add('Graphqlizer - Public API - resolvers', function (test) {
  test.equal(
    resolvers('AwesomeBook', fakeCollection).Query.getAwesomeBook(
      null,
      {
        _id: 'bookIdNice111',
      },
    ),
    ['getBook', { _id: 'bookIdNice111' }],
  )

  test.equal(
    resolvers('AwesomeBook', fakeCollection).Mutation.deleteAwesomeBook(
      null,
      {
        _id: 'bookIdNice111',
      },
    ),
    ['getBook', { _id: 'bookIdNice111' }],
  )
})
