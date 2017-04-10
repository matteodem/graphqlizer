# Relationships

Graphqlizer can handle related nested data by configuring custom `type` or `input` fields, similiar to when you provide two simple schemas to have more granular type definitions and resolvers.


```js
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { UserTypeSchema, UserInputSchema } from '{...}'

const typeFields = {
  friends: {
    type: '[User]',
    resolve: root => UserCollection.find({ ... }).fetch(), 
  },
}

const alienSchema = createCollectionSchema({ 
  type: 'User',
  collection: UserCollection,
  schema: {
    type: UserTypeSchema,
    input: UserInputSchema,
  },
  fields: {
    type: typeFields,
  },
})
```

This configuration either overwrites or adds the `friends` field to the graphql `User` type and when fetched through a query the `resolve` method is used to display the list of friends for the current user. Notice that the `[User]` is the field description that's directly used in the type definition and the resolve function for the resolver. You can also exclude fields from your simple schema by setting the value of the field to `false`.
