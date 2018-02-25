# graphqlizer 

[![Build Status](http://img.shields.io/travis/matteodem/graphqlizer.svg)](https://travis-ci.org/matteodem/graphqlizer)
[![Code Climate](https://img.shields.io/codeclimate/github/matteodem/graphqlizer.svg)](https://codeclimate.com/github/matteodem/graphqlizer)

Make your meteor mongo collections accessible over a graphql endpoint.

* Generates simple type definitions + resolvers
* Uses `check` and SimpleSchema to validate arguments
* Great for prototyping and beyond

```js
import {
  crud,
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'
import { AlienCollection, AlienSimpleSchema } from '{...}'

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
The most basic configuration requires you to set the mongo `collection` and a `key` to identify your data.

```js
import { crud } from 'meteor/easy:graphqlizer'
import { CarCollection} from '{...}'

const alienSchema = crud('Car', CarCollection) // or
const otherAlienSchema = crud('Car', CarCollection, CustomCarSimpleSchema)
```

You can optionally specify a custom schema as the 3rd argument. 
Graphqlizer uses the inferred or provided simple schema configuration to infer the 
graphql type fields (`Int`, `Float` etc) and if it's optional or required (`!`). 

To actually have access to your data you 
have to use the `generateTypeDefsAndResolvers`
function to generate the final typeDefs and resolvers to create the GraphQL schema.

```js
import { 
  crud,
  generateTypeDefsAndResolvers
} from 'meteor/easy:graphqlizer'
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
to generate the type definitions and resolvers. You can cross reference your collections
by using custom fields configuration (see the further reading section).

## Further reading

You can read about following topics to learn more.

* [Customizing fields - Changing field definitions](./docs/CustomizingFields.md)
* [Relationships - How to handle nested related data](./docs/Relationships.md)
* [Collection methods - Adjusting logic on CRUD operations](./docs/CollectionMethods.md)
* [Going Beyond CRUD - Customizing mutations and queries](./docs/BeyondCRUD.md)
