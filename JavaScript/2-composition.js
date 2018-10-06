'use strict';

const compose = (f1, f2) => x => f2(f1(x));

// Usage

const upperCapital = s => s.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const lower = s => s.toLowerCase();

const capitalize = compose(lower, upperCapital);

const s = 'MARCUS AURELIUS';
console.log(s);
console.log(`lower('${s}') = '${lower(s)}'`);
console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);
console.log(`capitalize('${s}') = '${capitalize(s)}'`);
