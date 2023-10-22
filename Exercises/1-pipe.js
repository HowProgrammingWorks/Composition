'use strict';

const pipe = (...fns) => {
  fns.forEach((fn) => {
    if (typeof fn !== 'function') {
      throw new Error('Type of fn is not a function');
    }
  });
  return (x) => fns.reduce((v, f) => f(v), x);
};

module.exports = { pipe };
