'use strict';

const compose = (f1, f2) => (...args) => f2(f1(...args));

// Usage

const upperCapital = s => s.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const lower = s => (typeof s === 'string' ? s.toLowerCase() : '');

const s = 'MARCUS AURELIUS';
console.log(s);
console.log('lower(' + s + ') = ' + lower(s));
console.log('upperCapital(' + s + ') = ' + upperCapital(s));

const capitalize = compose(lower, upperCapital);
console.log('capitalize(' + s + ') = ' + capitalize(s));
