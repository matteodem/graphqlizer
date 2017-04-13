# Adjusting collection methods

You can adjust collection methods such as `insert` or `findOne` by
extending the Mongo.Collection class and passing that to the `createCollectionSchema`
call.


```js
import { Mongo } from 'meteor/mongo'

class AlienCollection extends Mongo.Collection {
  insert(doc) {
    if (this.graphqlContext && this.graphqlContext.userRole === 'admin') {
      return super.insert(doc)
    }
  }
  find(selector) {
    return super.find({
      ...selector,
      ...(this.graphqlFilters || {}),
    })
  }
}

export const collection = new AlienCollection('alien')
```

In the example above we extend the Mongo.Collection and adjust the insert and find method.
As you can see the graphql context can be accessed ove `this.graphqlContext` and if it's a 
find / findOne call you can access the filters over `this.graphqlFilters`. 
