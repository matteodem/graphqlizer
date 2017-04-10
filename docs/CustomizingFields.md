# Customizing fields

Similiar to [related data](./Relationships.md) you can use fields configuration to
add, remove or change how your GraphQL types are structured.

```js
import { createCollectionSchema } from 'meteor/easy:graphqlizer'
import { UserTypeSchema, UserInputSchema } from '{...}'

const typeFields = {
  friends: {
    type: '[User]',
    resolve: root => UserCollection.find({ ... }).fetch(), 
  },
  fullName: {
    type: 'String',
    resolve: root => `${root.firstName} ${root.lastName}`,
  },
}

const inputFields = {
  isEnabled: false,
  friendIds: {
    type: '[String]',
  },
}

const userSchema = createCollectionSchema({ 
  type: 'User',
  collection: UserCollection,
  schema: {
    type: UserTypeSchema,
    input: UserInputSchema,
  },
  fields: {
    type: typeFields,
    input: inputFields,
  },
})
```

In the above example we set the `isEnabled` field to false, so that
it's ignored for our `input` GraphQL type. We also overwrite or add the friendIds field
to be a list of `String`s. Notice that no resolve method is not passed, because it's not needed
for `input` validation.

For the `type` fields we configure have the `friends` field configured to find related users and
the `fullName` field to compose the firstName and lastName from the document root.

As you can see the `fields` configuration provides a simple but concise way to extend or override
the inferred resolvers and type definitions from graphqlizer. If you want to get more specific
and find out how to go beyond the basic mutations / queries checkout the
[Going beyond basic CRUD](./BeyondCRUD.md) doc
