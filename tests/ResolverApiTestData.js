const customSchema = new SimpleSchema({
  _id: {
    type: String,
  },
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

const fakeCollection = {
    insert(doc) {
      return doc._id
    },
    update(selector, updateDoc) {
      return 'updated'
    },
    remove(selector) {
      return 'removed'
    },
    find(selector, opts) {
      return { fetch: () => ['listBook', selector, opts] }
    },
    findOne(arg) {
      return ['getBook', arg]
    },
    simpleSchema() {
      return new SimpleSchema({
        _id: {
          type: String,
        },
        age: {
          type: Number,
        },
        awesomeName: {
          type: String,
        },
      })
    },
  }

module.exports = {
  customSchema,
  fakeCollection,
}
