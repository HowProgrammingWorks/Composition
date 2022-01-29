'use strict';

const compose = (...fns) => x => {
  for (const i in fns) {
    if (typeof fns[i] !== 'function') {
      throw undefined;
    }
  }
  let res = x;
  const last = fns.length - 1;
  for (let i = last; i >= 0; i--) {
    res = fns[i](res);
  }
  return res;
};

const twice = x => x * 2;
const cube = x => x * 3;

const capitalize = compose(1, cube, twice);
console.log(`use capitalize = '${capitalize(10)}'`);


module.exports = { compose };
