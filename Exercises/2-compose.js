'use strict';

const compose = (...fns) => {
  const events = { };
  const emit = (event, ...args) => {
    events[event](args);
  };
  const f = x => {
    let res = x;
    try {
      for (const f of fns.reverse()) {
        res = f(res);
      }
    } catch (e) {
      emit('error', e);
      return undefined;
    }
    return res;
  };

  const on = (event, callback) => {
    events[event] = callback;
  };
  Object.assign(f, { on });
  return f;
};

module.exports = { compose };
