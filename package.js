Package.describe({
  name: 'matteodem:graphqlizer',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.2');
  api.use(['ecmascript', 'apollo@0.7.2', 'aldeed:simple-schema@1.5.3']);
  api.mainModule('./lib/index.js', 'server');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest', 'modules']);
  api.use('matteodem:graphqlizer');
  api.addFiles([
    './tests/TypeDefGeneratorTest.js',
  ], 'server');
});
