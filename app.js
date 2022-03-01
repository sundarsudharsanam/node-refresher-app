// import { command, parse } from 'yargs'; -- ES6 syntax won't work in Node.js
const yargs = require('yargs');
const chalk = require('chalk');

const util = require('./util');

console.log(chalk.bold.yellow('Enter your name, age and email using login command!'));

yargs.command('login', 'Enter name, age and email', () => {
  util.login(yargs.argv);
});

yargs.parse();
