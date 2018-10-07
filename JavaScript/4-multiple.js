'use strict';

const compose = (...fns) => (...args) => (
  fns.reduce((args, fn) => [fn(...args)], args)
);

// Usage

const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);

const upperCapital = s => s.split(' ').map(upperFirst).join(' ');

const lower = s => s.toLowerCase();

const trim = s => s.trim();

const capitalize = compose(trim, lower, upperCapital);

const s = '   MARCUS AURELIUS   ';
console.log(s);
console.log(`lower('${s}') = '${lower(s)}'`);
console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);
console.log(`capitalize('${s}') = '${capitalize(s)}'`);
