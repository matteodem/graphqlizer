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
