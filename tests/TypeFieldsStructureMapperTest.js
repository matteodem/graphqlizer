import {
  mapSchemaToTypeFields,
} from '../lib/TypeFieldsStructureMapper'

const CompanySchema = new SimpleSchema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
})

Tinytest.add('Graphqlizer - TypeFieldsStructureMapper - Complex', function (test) {
  const mappedFields = mapSchemaToTypeFields(
    new SimpleSchema({
      age: {
        type: Number,
        optional: true,
      },
      score: {
        type: Number,
        decimal: true,
      },
      username: {
        type: String,
      },
      tags: {
        type: [String],
      },
      isEnabled: {
        type: Boolean,
        optional: true,
      },
      company: {
        type: CompanySchema,
      },
      ignoredField: {
        type: String,
      },
    }),
    {
      company: {
        type: 'Company',
        resolve(root) {
          return { id: 'companyId', name: 'wow' }
        },
      },
      ignoredField: false,
    },
  )

  test.equal(mappedFields.age.type, 'Int')
  test.isUndefined(mappedFields.age.resolve)
  test.equal(mappedFields.score.type, 'Float!')
  test.equal(mappedFields.username.type, 'String!')
  test.equal(mappedFields.tags.type, '[String]!')
  test.isUndefined(mappedFields.tags.resolve)
  test.equal(mappedFields.isEnabled.type, 'Boolean')
  test.equal(mappedFields.company.type, 'Company')
  test.equal(mappedFields.company.resolve(), { id: 'companyId', name: 'wow' })
  test.isUndefined(mappedFields.ignoredField)
})

Tinytest.add('Graphqlizer - TypeFieldsStructureMapper - Complex type', function (test) {
  try {
    mapSchemaToTypeFields(new SimpleSchema({
      company: {
        type: CompanySchema,
      },
    }))

    test.fail()
  } catch(e) {
    test.ok()
  }
})
