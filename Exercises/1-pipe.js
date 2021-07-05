'use strict';

const pipe = (...fns) => {
  fns.forEach(itm => {
    if (typeof itm !== 'function') {
      throw new Error('Functions\'s args must be a function');
    }
  });
  return x => {
    fns.forEach(fn => {
      x = fn(x);
    });
    return x;
  };
};

module.exports = { pipe };
