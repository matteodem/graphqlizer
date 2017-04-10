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

export const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [alienSchema],
})
```

This package does not fully abstract GraphQL, so be sure to learn about it so that you have the needed vocabulary and knowledge to profit from this package. The GraphQL site has a cool [text based introduction](http://graphql.org/learn/) and if you're a visual kind of person like me, you can check out my [introduction screencast](matteos-tech-courses.thinkific.com).

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

Graphqlizer makes great use of the provided simple schema configuration to infer the graphql type fields (`Int`, `Float` etc) and if it's optional or required (`!`). It is possible to be more granular by providing an input and type simple schema to define the graphql fields.

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

## Further reading

You can read on following topics to see how to handle related nested data, custom fields and how to customize your GraphQL Api as your app grows. 

* [Relationships - How to handle related data](./docs/Relationships.md)
