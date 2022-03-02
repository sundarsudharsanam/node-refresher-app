const api = require('./api').api;

const chalk = require('chalk');
const validator = require('validator');
const axios = require('axios');

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

const getRandomNumber = (min, max) => {
  /**
   * Example: min 5, max 12
   * Math.random() -- random number between 0 and 1
   * Math.random() * diff -- random number between 0 and diff, in this case, 0 and 7
   * Math.floor() -- returns integer value
   * + min -- random number between min and max, in this case, 5 and 12
   */

  const diff = max - min;
  return Math.floor(Math.random() * diff) + min;
};

const getRandomUser = () => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (response && response.data) {
        const users = response.data;
        const userIndex = getRandomNumber(0, users.length);
        const user = users[userIndex];
        console.log(chalk.bold.yellow(`Random user :: ${user.id}. ${user.name} | ${user.email}`));

        login({ name: user.name, age: getRandomNumber(18, 75), email: user.email });
      } else {
        console.log(chalk.bgRed('Logging off... Unable to connect to server!'));
      }
    })
    .catch(err => {
      console.log(chalk.bgRed('Logging off... Unable to connect to server!'));
    });
}

module.exports = { login, getRandomUser };
