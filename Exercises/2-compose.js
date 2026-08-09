'use strict';

const compose = (...fns) => {
  const eventHandlers = {};
  const composedFn = (x) => {
    if (fns.length === 0) return x;
    let result = x;
    try {
      for (let i = fns.length - 1; i >= 0; i--) {
        result = fns[i](result);
      }
    } catch (error) {
      if (eventHandlers.error) {
        eventHandlers.error.forEach(handler => handler(error));
      }
      return undefined;
    }
    return result;
  };

  composedFn.on = (eventType, handler) => {
    if (!eventHandlers[eventType]) {
      eventHandlers[eventType] = [];
    }
    eventHandlers[eventType].push(handler);
  };

  return composedFn;
};

module.exports = { compose };
