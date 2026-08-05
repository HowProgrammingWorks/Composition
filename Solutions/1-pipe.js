'use strict';

const pipe = (...fns) => {
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      throw new Error('All pipe arguments should be functions');
    }
  }
  return (x) => fns.reduce((value, fn) => fn(value), x);
};

module.exports = { pipe };
