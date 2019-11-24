'use strict';

const compose = (...fns) => {
  const events = { };

  const emit = (event, ...args) => {
    events[event](args);
  };

  const f = function (x) {
    let y = x;
    try {
      for (const f of fns.reverse()) {
        y = f(y);
      }
    } catch (e) {
      emit('error', e);
      return undefined;
    }
    return y;
  };

  f.on = (event, callback) => {
    events[event] = callback;
  };

  return f;
};

module.exports = { compose };
