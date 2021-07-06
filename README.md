# MachineLlama/MERN-Setup

A node script for quickly creating a functional MERN stack application. Uses Mongo, Express, React, Node, Webpack, Babel, Sass, and Prettier.

To run: `yarn install` and then `node start` or `node start <project-name>`
- Node and Yarn are required prerequisites
- If using Mongo, make sure to download MongoDB, install, add bin folder to path, and run with `mongod`
- Running will copy Webpack, Babel, Express, and React files to a new directory; necessary dependencies will then be installed via Yarn
- The newly created App can be run with `yarn run start` (on port 5070 by default)
- An Express server can be run by running `yarn run express` (on port 4070 by default)

## Features
- React
  - Functional component examples
  - React Routing
  - Example calls to backend API
- SASS
- Mongo
- Express
  - Example GET and POST endpoints
  - Example calls to Mongo
- Webpack
  - JS and SASS compilation
  - File resolution alias example
- Babel
  - ES compilation
- Prettier
  - Auto run on commit

## Config (defaults can be changed in `config.js`)
```js
config = {
  entryFile: './src/index.js',
  webpack: {
    htmlFilename: 'index.html',
    htmlTemplate: './public/index.html',
    openOnStart: true,
    outputFile: 'bundle.js',
    outputPath: 'dist',
    port: 5070
  },
  package: {
    author: 'author_name',
    description: 'This is a default description',
    license: 'MIT',
    projectName: 'new-project',
    repositoryType: 'git',
    repositoryURL: 'repository_url',
    version: '0.0.1'
  },
  manifest: {
    backgroundColor: '#ffffff',
    description: 'This is a description for the new project',
    display: 'fullscreen',
    icons: '[]',
    name: 'New Project Name',
    orientation: 'portrait',
    shortName: 'New Project Short Name',
    startURL: '/',
    themeColor: '#ffffff'
  },
  meta: {
    description: 'This is the meta description for the new project'
  },
  express: {
    port: 4070,
    url: 'http://localhost'
  },
  mongo: {
    port: '27017',
    url: 'mongodb://localhost'
  }
}
```
