const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const deepForEach = require('deep-for-each');
const get = require('lodash/get');
const stringReplaceAll = require('string-replace-all');
const { execSync } = require('child_process');

const config = require('./config');

// arguments
// 1: directory name, default = config.package.projectName
const args = process.argv.slice(2);
const directoryName = args[0] || config.package.projectName;

console.info('Creating files...');

// Create new directory
const directoryPath = `../${directoryName}`;
fs.mkdirSync(directoryPath);

// Copy all files in templates folder to new project directory
const templatesDirectory = './templates';
fse.copySync(templatesDirectory, directoryPath);
console.log('Succesfully copied files to new directory');

// Create a list of all file paths in the new project directory
const files = [];
function getFiles(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const absolute = path.join(dirPath, file);
    if (fs.statSync(absolute).isDirectory()) {
      return getFiles(absolute);
    }

    return files.push(absolute);
  });
}
getFiles(directoryPath);

// Replace all  default values from config file
files.forEach(file => {
  let fileContent = fs.readFileSync(file, 'utf-8');
  fileContent = replaceDefaults(fileContent);
  fs.writeFileSync(file, fileContent);
});

function replaceDefaults(text) {
  let newText = text;
  deepForEach(config, (value, key, subject, path) => {
    let newValue = get(config, path);
    if (path === 'package.projectName') {
      newValue = directoryName;
    }
    newText = stringReplaceAll(newText, `{{${path}}}`, newValue);
  });

  return newText;
}

console.log('Succesfully replaced config defaults');
console.log('Installing dependencies...');

// Install necessary dependencies in new directory
process.chdir(directoryPath);
const EXEC_TIMEOUT = 30 * 1000; // 30 seconds
execSync('yarn add react react-dom express superagent cors mongodb', { timeout: EXEC_TIMEOUT });
execSync('yarn add react-router-dom', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev @babel/core', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev @babel/preset-env', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev @babel/runtime', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev @babel/preset-react @babel/cli', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev babel-loader', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev webpack', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev webpack-cli', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev webpack-dev-server', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev sass-loader css-loader style-loader', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev sass mini-css-extract-plugin html-webpack-plugin', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev core-js@3 rimraf', { timeout: EXEC_TIMEOUT });
execSync('yarn add --dev lint-staged@10.5.4 prettier@2.2.1 husky@4', { timeout: EXEC_TIMEOUT });
console.log('Succesfully installed dependencies');

// init git with main branch
console.log('Initializing git...')
execSync('git config --global init.defaultBranch main', { timeout: EXEC_TIMEOUT });
execSync('git init', { timeout: EXEC_TIMEOUT });

// initial commit
execSync('git add .', { timeout: EXEC_TIMEOUT });
execSync('git commit -m "init"', { timeout: EXEC_TIMEOUT });

console.log('Finished');
