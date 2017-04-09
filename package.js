Package.describe({
  name: 'matteodem:graphqlizer',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md',
})

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.2')
  api.use(['ecmascript', 'check', 'apollo@0.7.2', 'aldeed:simple-schema@1.5.3'])
  api.mainModule('./lib/index.js', 'server')
})

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest', 'modules', 'aldeed:simple-schema@1.5.3'])
  api.use('matteodem:graphqlizer')
  api.addFiles([
    './tests/TypeDefGeneratorTest.js',
    './tests/ResolversGeneratorTest.js',
    './tests/TypeFieldsStructureMapperTest.js',
  ], 'server')
})
