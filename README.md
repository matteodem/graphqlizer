# graphqlizer 

Make your meteor mongo collections accessible over a graphql endpoint.

* Generates simple type definitions + resolvers
* Uses `check` and SimpleSchema to validate arguments
* Great for prototyping and beyond

```js
import {
  createCollectionSchema,
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'
import { AlienCollection, AlienSimpleSchema } from '{...}'

const alienSchema = createCollectionSchema({ 
  type: 'Alien',
  collection: AlienCollection,
  schema: AlienSimpleSchema,
})

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [alienSchema],
})
```

This package does not fully abstract GraphQL, so be sure to learn about it so that you have the
needed vocabulary and knowledge to profit from this package. The GraphQL site has a
cool [text based introduction](http://graphql.org/learn/) and if you're a visual kind of person like me, 
you can check out my [introduction screencast](https://matteos-tech-courses.thinkific.com/courses/introduction-to-graphql).

## How to install

```bash
# Install npm packages
meteor npm install --save apollo-client graphql-server-express express graphql graphql-tools body-parser
# Install meteor packages
meteor add apollo aldeed:simple-schema easy:graphqlizer
```

## How to use

Graphqlizer uses [SimpleSchema](https://github.com/aldeed/meteor-simple-schema) to generate the resolvers and type definitions. The most basic configuration requires you to set the mongo `collection`, a `key` to identify your data and a simple `schema` that is used for input and type validation.

```js
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { UserSchema } from '{...}'

const alienSchema = createCollectionSchema({ 
  type: 'User',
  collection: Meteor.users,
  schema: UserSchema,
})
```

Graphqlizer uses the provided simple schema configuration to infer the 
graphql type fields (`Int`, `Float` etc) and if it's optional or required (`!`). 
It is possible to be more granular by providing an input and type simple schema to 
define the graphql fields.

```js
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { UserTypeSchema, UserInputSchema } from '{...}'

const alienSchema = createCollectionSchema({ 
  type: 'User',
  collection: UserCollection,
  schema: {
    type: UserTypeSchema, // typeof SimpleSchema
    input: UserInputSchema, // typeof SimpleSchema
  },
})
```

To actually have access to your alien data you 
have to use the `generateTypeDefsAndResolvers`
function to generate the final typeDefs and resolvers to create the GraphQL schema.

```js
import { 
  createCollectionSchema,
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

* [Relationships - How to handle nested related data](./docs/Relationships.md)
* [Customizing fields - Changing input / type field definitions](./docs/CustomizingFields.md)
* [Going Beyond CRUD - Customizing mutations and queries](./docs/BeyondCRUD.md)
