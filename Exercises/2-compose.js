'use strict';

const compose = (...fns) => {
  const events = new Map();
  const outputFn = x =>
    fns.reduceRight((arg, fn, i, arr) => {
      try {
        return fn(arg);
      } catch (e) {
        arr.length = 0;
        return outputFn.emit('error', e);
      }
    }, x);
  outputFn.emit = (event, ...args) => {
    const handlers = events.get(event);
    if (handlers) handlers.forEach(fn => fn(...args));
  };
  outputFn.on = (event, handler) => {
    const existsEvent = events.get(event);
    existsEvent ? existsEvent.push(handler) : events.set(event, [handler]);
  };
  return outputFn;
};

module.exports = { compose };
