const api = require('./api').api;

const chalk = require('chalk');
const validator = require('validator');

// Async - Await
const ageApi = async (age) => {
  return await api(age);
};

const logoff = () => {
  console.log(chalk.bgRed('Logging off... Invalid credentials!'));
};

const login = ({ name = '', age = '', email = '' }) => {
  if (name && validator.isEmail(email) && validator.isNumeric(age.toString()) && parseInt(age) > 0) {
    console.log(chalk.bold.green(name, age, email));

    // Using Callback
    api(age, (err, data) => {
      console.log(chalk.bgWhite.blue('Using Callback..'));
      if (err) {
        return console.log(chalk.bold.red(err));
      }
      console.log(chalk.bold.green(data));
    });

    // Using Promise
    api(age).then(data => {
      console.log(chalk.bgWhite.blue('Using Promise..'));
      console.log(chalk.bold.green(data));
    }).catch(err => {
      console.log(chalk.bgWhite.blue('Using Promise..'));
      console.log(chalk.bold.red(err));
    });

    // Using Async - Await
    ageApi(age).then(data => {
      console.log(chalk.bgWhite.blue('Using Async - Await..'));
      console.log(chalk.bold.green(data));
    }).catch(err => {
      console.log(chalk.bgWhite.blue('Using Async - Await..'));
      console.log(chalk.bold.red(err));
    });

  } else {
    logoff();
  }
};

module.exports = { login };
