const config = require('../config');

module.exports = function(name) {
  return `{
  "name": "${name}",
  "version": "${config.package.version}",
  "description": "${config.package.description}",
  "main": "${config.entryFile}",
  "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack serve --mode development"
  },
  "repository": {
    "type": "${config.package.repositoryType}",
    "url": "${config.package.repositoryURL}"
  },
  "keywords": [
    "React",
    "Node",
    "Express"
  ],
  "author": "${config.package.author}",
  "license": "${config.package.license}",
  "dependencies": {
  },
  "devDependencies": {
  }
}`
}
