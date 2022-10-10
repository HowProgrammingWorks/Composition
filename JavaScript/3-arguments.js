'use strict';

const compose = (f, g) => (...args) => f(g(...args));
const pipe = (f, g) => (...args) => g(f(...args));

// Usage

const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const upperCapital = (s) => s.split(' ').map(upperFirst).join(' ');
const lower = (s) => s.toLowerCase();

const s = 'MARCUS AURELIUS';
console.log(s);
console.log(`lower('${s}') = '${lower(s)}'`);
console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);

{
  console.log('Use compose');
  const capitalize = compose(upperCapital, lower);
  console.log(`capitalize('${s}') = '${capitalize(s)}'`);
}
{
  console.log('Use pipe');
  const capitalize = pipe(lower, upperCapital);
  console.log(`capitalize('${s}') = '${capitalize(s)}'`);
}
