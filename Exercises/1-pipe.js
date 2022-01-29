'use strict';

const pipe = (...fns) => x => {
  for (const i in fns) {
    if (typeof fns[i] !== 'function') {
      throw new Error(`fns['${i}'] is not a function`);
    }
  }
  return (fns.reduce((v, f) => f(v), x));
};

const twice = x => x * 2;
const cube = x => x ** 3;

console.log('Use pipe');
const capitalize = pipe(1, twice, cube);

const number = 5;
console.log(`capitalize('${number}') = '${capitalize(number)}'`);

module.exports = { pipe };
