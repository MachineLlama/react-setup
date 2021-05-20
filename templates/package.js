const config = require('../config');

module.exports = function(name) {
  return `{
  "name": "${name}",
  "version": "${config.package.version}",
  "description": "${config.package.description}",
  "main": "${config.entryFile}",
  "scripts": {
    "dev": "webpack --mode development",
    "clean": "rimraf dist",
    "build": "npm run clean && webpack --mode production",
    "start": "npm run build && webpack serve --mode development",
    "start-prod": "webpack serve --mode production",
    "express": "node express/index.js"
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
