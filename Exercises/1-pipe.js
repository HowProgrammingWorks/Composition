'use strict';

const pipe = (...fns) => x => {
    
    for (const fn of fns) {
      if (typeof fn !== 'function') {
        throw new Error('All arguments must be functions');
      }
    }
  
    
    return fns.reduce((v, fn) => fn(v), x);
  };

module.exports = { pipe };
