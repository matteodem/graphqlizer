module.exports = {
  defaultCrud: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },

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
    },
  }
}
