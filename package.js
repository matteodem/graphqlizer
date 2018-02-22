Package.describe({
  name: 'easy:graphqlizer',
  version: '0.1.0',
  summary: 'Make your mongo collections accessible over a graphql endpoint',
  git: 'https://github.com/matteodem/graphqlizer',
  documentation: 'README.md',
})

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.2')
  api.use(['ecmascript', 'check', 'aldeed:simple-schema@1.5.3'], 'server')
  api.use(['apollo'], 'server', { weak: true })
  api.mainModule('./lib/index.js', 'server')
})

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest', 'modules', 'aldeed:simple-schema@1.5.3'], 'server')
  api.use('easy:graphqlizer', 'server')
  api.addFiles([
    './tests/TypeDefGeneratorTest.js', // deprecated
    './tests/ResolversGeneratorTest.js',
    './tests/TypeFieldsStructureMapperTest.js',
    './tests/GraphqlCollectionConfigCreatorTest.js',
    './tests/TypeDefApiTest.js',
    './tests/ResolverApiTest.js',
  ], 'server')
})
