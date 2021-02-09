'use strict';

const pipe = (...fns) => {
  fns.forEach(x => {
    if (typeof x !== 'function') throw new Error('arg must be a function');
  });
  return num => fns.reduce((val, fn) => fn(val), num);
};

module.exports = { pipe };
