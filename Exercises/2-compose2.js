'use strict';

const compose = (...fns) => {
  const events = {};
  const err = [];
  fns.forEach(x => {
    if (typeof x !== 'function') {
      err.push(new Error(`${x} not a function`));
    };
  });
  const fn = num => {
    if (err) fn.emmit('error', err);
    return fns.reduce((val, fn) => {
      if (typeof fn === 'function') {
        return fn(val);
      } else return undefined;
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
    if (res) {
      res.forEach(callback => callback(...args));
    }
  }
  return fn;
};

const inc = x => ++x;
const twice = x => x * 2;
const cube = x => x ** 3;
const f1 = compose(inc, 7, 9);
f1.on('error', err => {
  console.log(err);
});
console.log(f1(5));
const f2 = compose(inc, twice, cube);
console.log(f2(5));

module.exports = { compose };
