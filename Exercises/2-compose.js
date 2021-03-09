'use strict';

const compose = (...fns) => {
  const errors = [];

  const fn = x => {
    if (fns.length === 0) return x;

    const start = fns.length - 1;
    let res = x;

    try {
      for (let i = start; i >= 0; i--) {
        res = fns[i](res);
      }
      return res;
    } catch (err) {
      errors.forEach(e => e(err));
    }
  };

  fn.on = callback => {
    errors.forEach(err => callback(err));
  };

  return fn;
};

module.exports = { compose };
