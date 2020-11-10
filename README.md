# MachineLlama/React-Setup

A node script for quickly creating a React app using Webpack, Babel, and Sass.

To run: `node start` or `node start <project-name>`
- Node and NPM are required prerequisites
- Running will copy Webpack, Babel, and basic React files to a new directory; necessary dependencies will then be installed via NPM
- The newly created App can be run with `npm run start` (on port 5070 by default)

Default values for setup can be changed in `config.js`:
```js
{
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
```