const sq = n => n * n;

const api = (n, callback) => {
  if (callback) {
    setTimeout(() => {
      if (n % 2 === 0) {
        callback(null, `Square :: ${sq(n)}`);
      } else {
        callback('Odd number!');
      }
    }, 2000);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (n % 2 === 0) {
          resolve(`Square :: ${sq(n)}`);
        } else {
          reject('Odd number!');
        }
      }, 2000);
    });
  }
};

// export default { api }; -- ES6 syntax won't work in Node.js
module.exports = { api };
