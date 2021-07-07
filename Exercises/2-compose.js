'use strict';

const compose = (...fns) => {
  let error = null;
  try {
    for (const fn of fns) {
      if (!(fn instanceof Function)) throw new Error('Type of argument should be a function.');      
    }
  } catch (e) {
    error = e;
  }
  const composed = x => {
    if (error) return undefined;
    return fns.reduceRight((v, f) => f(v), x);
  }
  composed.on = (eventName, callback) => {
    if (eventName === 'error' && error) callback(error);
  }
  return composed;
}

module.exports = { compose };
