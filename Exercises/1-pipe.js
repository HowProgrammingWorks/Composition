'use strict';

const pipe = (...fns) => {
  if (fns.reduce((x, f) => typeof f !== 'function' | x, false)) {
    throw new Error('Not a function');
  }

  return x => fns.reduce((x, f) => f(x), x);
};

module.exports = { pipe };
