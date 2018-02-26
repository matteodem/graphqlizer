# Migrate from 0.* to 1.0

Reading the README for v1 is the easiest way to know what's changed since most of the API is different now.
The latest 0.* release will output deprecation warnings. Here's a short list of what changed

* `createCollectionSchema` is now called `crud` 
* Custom **input and type fields are removed** in favor of composable methods (for example `typeDef`)
* **`this.graphqlContext` is removed** (inside a collection method) in favor of writing a custom `resolver`
