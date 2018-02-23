export const customSchema = new SimpleSchema({
  age: {
    type: Number,
  },
  awesomeName: {
    type: String,
  },
  secondAwesomeName: {
    type: String,
  },
  isAwesome: {
    type: Boolean,
    optional: true,
  },
})

export const fakeCollection = {
    insert(doc) {
      return ['createBook', doc]
    },
    update(selector, updateDoc) {
      return ['updateBook', selector, updateDoc]
    },
    remove(selector) {
      return ['deleteBook', selector]
    },
    find(selector, opts) {
      return { fetch: () => ['listBook', selector, opts] }
    },
    findOne() {
      return 'getBook'
    },
    simpleSchema() {
      return new SimpleSchema({
        age: {
          type: Number,
        },
        awesomeName: {
          type: String,
        },
      })
    },
  }
