'use strict';

const compose = (...fns) => {
  const events = {};
  const fn = num => fns.reverse().reduce((val, f) => {
    try {
      if (typeof val === 'undefined') return undefined;
      return f(val);
    } catch (e) {
      const err = events['error'];
      if (err) err(e);
      return undefined;
    }
  }, num);
  fn.on = (event, callback) => {
    events[event] = callback;
  };
  return fn;
};

module.exports = { compose };
