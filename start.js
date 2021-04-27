const fs = require('fs');
const { exec } = require('child_process');

const config = require('./config');
const readme = require('./templates/readme');
const package = require('./templates/package');
const webpack = require('./templates/webpack');
const babelrc = require('./templates/babelrc');
const gitignore = require('./templates/gitignore');
const indexHtml = require('./templates/public/index-html');
const manifest = require('./templates/public/manifest-json');
const robots = require('./templates/public/robots-txt');
const app = require('./templates/src/App');

// arguments
// 1: directory name, default = config.projectName
const args = process.argv.slice(2);
const directoryName = args[0] || config.package.projectName;

console.info('Creating files...');

// Create new directory
const directoryPath = `../${directoryName}`;
fs.mkdirSync(directoryPath);

// README.md
const readMeContent = readme(directoryName);
const readMePath = `${directoryPath}/README.md`;
fs.writeFileSync(readMePath, readMeContent);

// package.json
const packageContent = package(directoryName);
const packagePath = `${directoryPath}/package.json`;
fs.writeFileSync(packagePath, packageContent);

// webpack.config.js
const webpackContent = webpack();
const webpackPath = `${directoryPath}/webpack.config.js`;
fs.writeFileSync(webpackPath, webpackContent);

// .babelrc
const babelContent = babelrc();
const babelPath = `${directoryPath}/.babelrc`;
fs.writeFileSync(babelPath, babelContent);

// .gitignore
const gitignoreContent = gitignore();
const gitignorePath = `${directoryPath}/.gitignore`;
fs.writeFileSync(gitignorePath, gitignoreContent);

// Create public directory and copy files
fs.mkdirSync(`${directoryPath}/public`);

// public/index.html
const indexHtmlContext = indexHtml(directoryName);
const indexHtmlPath = `${directoryPath}/public/index.html`;
fs.writeFileSync(indexHtmlPath, indexHtmlContext);

// public/manifest.json
const manifestContent = manifest();
const manifestPath = `${directoryPath}/public/manifest.json`;
fs.writeFileSync(manifestPath, manifestContent);

// public/robots.txt
const robotsContent = robots();
const robotsPath = `${directoryPath}/public/robots.txt`;
fs.writeFileSync(robotsPath, robotsContent);

// Create src directory and copy files
fs.mkdirSync(`${directoryPath}/src`);
fs.copyFileSync('./templates/src/index.js', `${directoryPath}/src/index.js`);

// App.js
const appContent = app();
const appPath = `${directoryPath}/src/App.js`;
fs.writeFileSync(appPath, appContent);

// Copy scss file
fs.copyFileSync('./templates/src/App.scss', `${directoryPath}/src/App.scss`);

console.info('\nInstalling dependencies...');

// Install necessary dependencies in new directory
process.chdir(directoryPath);
exec('npm install react react-dom --save');
exec('npm install webpack webpack-cli webpack-dev-server sass-loader css-loader style-loader sass mini-css-extract-plugin html-webpack-plugin @babel/core @babel/preset-env babel-loader @babel/runtime core-js@3 @babel/preset-react rimraf --save-dev');
exec('git init');
