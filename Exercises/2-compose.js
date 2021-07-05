'use strict';

const compose = (...fns) => {

  const events = {};
  const fnComp = function (x) {
    try {
      fns.reverse().forEach(fn => {
        x = fn(x);
      });
      return x;
    } catch (e) {
      fnComp.emit('error', e);
      return;
    }
  };

  fnComp.on = function (name, fn) {
    const event = events[name];
    if (event) {
      event.push(fn);
    } else {
      events[name] = [fn];
    }
  };

  fnComp.emit = function (name, ...data) {
    const event = events[name];
    if (event) event.forEach(fn => fn(...data));
  };

  return fnComp;
};

module.exports = { compose };
