module.exports = {
  entryFile: './src/index.js',
  webpack: {
    outputPath: 'dist',
    outputFile: 'bundle.js',
    openOnStart: true,
    port: 5070,
    htmlFilename: 'index.html',
    htmlTemplate: './public/index.html'
  },
  package: {
    projectName: 'new-project',
    author: 'author_name',
    version: '0.0.1',
    description: 'This is a default description',
    license: 'MIT',
    repositoryType: 'git',
    repositoryURL: 'repository_url'
  }
}