'use strict';

const compose = (...fns) => {
  const events = {};
  const fn = num => {
    return fns.reverse().reduce((val, fn) => {
      try {
        return fn(val);
      } catch (e) {
        fn.emmit('error', e)
        return undefined;
      }
    }, num);
  };
  fn.on = (event, callback) => {
    let res = events[event];
    if (!res) res = [];
    res.push(callback);
    events[event] = res;
  }
  fn.emmit = (event, ...args) => {
    const res = events[event];
    if (res) res.forEach(callback => callback(...args));
  }
  return fn;
};

module.exports = { compose };
