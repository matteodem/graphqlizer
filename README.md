# graphqlizer 

Make your meteor based collections accessible over a graphql endpoint.

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
