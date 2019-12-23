'use strict';
const pipe = (...fns) => {
  if (!fns.reduce((g, f) => typeof f === 'function' && g, true)) {
    throw new Error('Not a function');
  }

  return g => fns.reduce((g, f) => f(g), g);
};

module.exports = { pipe };
