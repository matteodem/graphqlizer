# graphqlizer 

Make your meteor mongo collections accessible over a graphql endpoint.

* Generates simple type definitions + resolvers
* Uses `check` to validate arguments
* Incrementally adoptable and customizable

```js
import {
  createCollectionSchema,
  generateTypeDefsAndResolvers,
} from 'meteor/easy:graphqlizer'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { AlienCollection, AlienSimpleSchema } from '{...}'

const userSchema = createCollectionSchema({ 
  type: 'Alien',
  collection: AlienCollection,
  schema: AlienSimpleSchema,
})

const { typeDefs, resolvers } = generateTypeDefsAndResolvers({
  schemas: [userSchema],
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

createApolloServer(req => ({ schema }), { graphiql: true })
```

## How to install

```bash
# Install npm packages
meteor npm install --save apollo-client graphql-server-express express graphql graphql-tools body-parser
# Install meteor packages
meteor add apollo aldeed:simple-schema easy:graphqlizer
```

## How to use

## Further reading

* Relationships
