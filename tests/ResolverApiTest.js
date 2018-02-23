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
    resolver.create('Book', fakeCollection)(
      null,
      { 
        data: { 
          age: 21,
          awesomeName: 'matt',
        },
      },
    ), 
    ['createBook', { age: 21, awesomeName: 'matt' }],
  )
  
  test.equal(
    resolver.create('Book', fakeCollection, customSchema)(
       null,
      { 
        data: { 
          age: 21,
          awesomeName: 'matt',
          secondAwesomeName: 'mattaya',
          isAwesome: true,
        },
      },
    ), 
    ['createBook', { 
      age: 21,
      awesomeName: 'matt',
      secondAwesomeName: 'mattaya',
      isAwesome: true,
    }],
  )
  
  try {
    resolver.create('Book', fakeCollection, customSchema)(
       null,
      { 
        data: { 
          age: 21,
          awesomeName: 'matt',
        },
      },
    )
    test.fail()
  } catch (e) {
  }
})
