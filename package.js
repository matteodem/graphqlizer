Package.describe({
  name: 'easy:graphqlizer',
  version: '0.1.0',
  summary: 'Make your mongo collections accessible over a graphql endpoint',
  git: 'https://github.com/matteodem/graphqlizer',
  documentation: 'README.md',
})

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.2')
  api.use(['ecmascript', 'check', 'apollo@0.7.2', 'aldeed:simple-schema@1.5.3'])
  api.mainModule('./lib/index.js', 'server')
})

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest', 'modules', 'aldeed:simple-schema@1.5.3'])
  api.use('easy:graphqlizer')
  api.addFiles([
    './tests/TypeDefGeneratorTest.js',
    './tests/ResolversGeneratorTest.js',
    './tests/TypeFieldsStructureMapperTest.js',
    './tests/GraphqlCollectionConfigCreatorTest.js',
  ], 'server')
})
