'use strict';

const pipe = (...fns) => {
  fns.forEach(fn => {
    if (typeof fn !== 'function') throw Error('not a Function');
  });

  return x => fns.reduce((acc, fn) => acc = fn(acc), x);
};


module.exports = { pipe };
