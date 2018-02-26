# graphqlizer 

[![Build Status](http://img.shields.io/travis/matteodem/graphqlizer.svg)](https://travis-ci.org/matteodem/graphqlizer)
[![Code Climate Maintainability](https://api.codeclimate.com/v1/badges/0bf617660f13359a56b5/maintainability)](https://codeclimate.com/github/matteodem/graphqlizer/maintainability)

Make your meteor mongo collections accessible over a graphql endpoint.

* Generates simple type definitions + resolvers
* Uses `check` and SimpleSchema to validate arguments
* Great for prototyping and beyond

```js
import { crud, generateTypeDefsAndResolvers } from 'meteor/easy:graphqlizer'
import { AlienCollection } from '{...}'

const alienSchema = crud('Alien', AlienCollection)

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [alienSchema],
})
```

This package does not fully abstract GraphQL, so be sure to learn about it so that you have the
needed vocabulary and knowledge to profit from this package. The GraphQL site has a
cool [text based introduction](http://graphql.org/learn/) and if you're a visual kind of person like me, 
you can check out my [introduction screencast](https://matteos-tech-courses.thinkific.com/courses/introduction-to-graphql).

If you want a simple usage example check out the [test app](https://github.com/matteodem/graphqlizer-test-app).

## How to install

```bash
# Install npm packages
meteor npm install --save apollo-client graphql-server-express express graphql graphql-tools body-parser
# Install meteor packages
meteor add apollo aldeed:simple-schema easy:graphqlizer
```

## How to use

Graphqlizer uses [SimpleSchema](https://github.com/aldeed/meteor-simple-schema) to generate the resolvers and type definitions. 
The most basic configuration requires you to pass the mongo collection and a name (TitleCase) to identify your data.

```js
import { crud } from 'meteor/easy:graphqlizer'
import { CarCollection } from '{...}'

const alienSchema = crud('Car', CarCollection)
// or with a custom schema
const otherAlienSchema = crud('Car', CarCollection, CustomCarSimpleSchema)
```

You can optionally specify a custom schema as the 3rd argument. 
Graphqlizer uses the simple schema configuration to infer the 
graphql type fields (`Int`, `Float` etc) and if it's optional or required (`!`). 

To actually have access to your data you 
have to use the `generateTypeDefsAndResolvers`
function to generate the final typeDefs and resolvers to create the GraphQL schema.

```js
import { crud, generateTypeDefsAndResolvers } from 'meteor/easy:graphqlizer'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

// ...

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [alienSchema],
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

createApolloServer({ schema, graphiql: true })
```

Notice that the `generateTypeDefsAndResolvers` expects a list of graphqlizer schemas
to generate the type definitions and resolvers.

### Beyond CRUD

Anytime you need to go beyond the basic CRUD you can use the following composable methods to extend your schema:

* `resolvers(name, Collection[, CustomSimpleSchema]) => {resolverObject}` CRUD resolvers
* `typeDefs(name, SimpleSchema) => [String]` CRUD type definitions
* `resolver.{create|update|delete|get|list}(Collection[, CustomSimpleSchema]) => Function` Specific resolver function
* `typeDef.{type|input|create|update|delete|get|list}(name, SimpleSchema) => String` Specific type definition

```js
import { resolvers, typeDefs } from 'meteor/easy:graphqlizer'

export default {
  resolvers: {
    ...resolvers('Book', BookCollection),
    Book: {
      relatedMovies (root, args) {
        return /* ... */
      },
    },
  },
  typeDefs: {
    ...typeDefs('Book', BookCollection.simpleSchema()),
    `
    extend type Book {
      relatedMovies: [Movie]   
    }
    `
  },
}
```

In the example above we extend `Book` with an additional field called `relatedMovies`. Be aware though that if you want to **add a new Query or Mutation** you need to use a deep merge function!

If you want to go even more granular you can use the `resolver` and `typeDef` functions.

```js
import { resolver, typeDef } from 'meteor/easy:graphqlizer'

export default {
  resolvers: {
    Query: {
      listBook: resolver.list(BookCollection),
      findBookFromFriends (root, args) {
        return /* ... */      
      }
    },
    Mutation: {
      createBook: resolver.create(BookCollection),
    }
  },
  typeDefs: [
    typeDef.type('Book', BookCollection.simpleSchema()),
    typeDef.input('Book', BookCollection.simpleSchema()),
    typeDef.list('Book'),
    typeDef.create('Book'),
    `
    extend type Query {
      findBookFromFriends: [Book]
    }
    `
  ],
}
```

This way you can mix and match type definitions and resolvers and if your app grows more complex decouple it from graphqlizer completely, without having to refactor code.
