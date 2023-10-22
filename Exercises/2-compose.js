'use strict';

const compose = (...fns) => {
  const handlers = [];
  const fn = (x) => {
    if (fns.length === 0) return x;
    const last = fns.length - 1;
    let res = x;
    try {
      for (let i = last; i >= 0; i--) {
        res = fns[i](res);
      }
    } catch (error) {
      res = undefined;
      handlers.forEach((handler) => handler(error));
    }
    return res;
  };
  fn.on = (name, handler) => {
    if (name === 'error') handlers.push(handler);
  };
  return fn;
};

module.exports = { compose };
