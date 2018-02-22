module.exports = {
  defaultCrud: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },

  fakeCollectionForResolvers: test => ({
    insert(doc) {
      test.equal(doc.username, 'matt')
      test.equal(doc.age, 21)
      test.equal(doc.firstName, 'mattaya')

      return 'createBook'
    },
    update(selector, updateDoc) {
      test.equal(selector._id, 'idDocUpdate')
      test.equal(updateDoc.$set.username, 'mattnew')
      test.equal(updateDoc.$set.age, 20)

      return 'updateBook'
    },
    remove(selector) {
      test.equal(selector._id, 'idDocToRemove')

      return 'deleteBook'
    },
    find(selector, opts) {
      test.equal(opts.limit, 10)
      test.equal(opts.skip, 5)
      test.equal(this.graphqlContext.userId, 'wazooba')
      test.equal(this.graphqlFilters[0].key, 'category')
      test.equal(this.graphqlFilters[0].value, 'woww')

      return { fetch: () => 'listBook' }
    },
    findOne() {
      return 'getBook'
    },
  }),

  inputSimpleSchema: new SimpleSchema({
    username: {
      type: String,
    },
    age: {
      type: Number,
    },
    firstName: {
      type: String,
      optional: true,
    },
    lastName: {
      type: String,
      optional: true,
    },
  }),

  fieldsConfig: {
    inputFields: {
      username: {
        type: 'String!',
      },
      firstName: {
        type: 'String',
      },
      lastName: {
        type: 'String',
      },
      enabled: {
        type: 'Boolean',
      },
      age: {
        type: 'Int',
      },
    },
    typeFields: {
      username: {
        type: 'String!',
      },
      fullName: {
        type: 'String',
        resolve: root => `${root.firstName} ${root.lastName}`,
      },
      age: {
        type: 'Int',
      },
      numbers: {
        type: '[Int]',
      },
    },
  }
}
