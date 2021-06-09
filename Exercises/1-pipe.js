'use strict';

const pipe = (...fns) => {
  const isValid = fns.every(fn => typeof fn === 'function');
  if (!isValid) throw new Error('invalid args');
  return x => fns.reduce((res, fn) => fn(res), x);
};

module.exports = { pipe };
