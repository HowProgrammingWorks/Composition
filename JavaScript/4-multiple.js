'use strict';

const compose = (...fns) => (...args) => (
  fns.reduce((args, fn) => [fn(...args)], args)
);

// Usage

const upperCapital = s => s.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const lower = s => (typeof s === 'string' ? s.toLowerCase() : '');

const trim = s => s.trim();

const s = '   MARCUS AURELIUS   ';
console.log(s);
console.log('lower(' + s + ') = ' + lower(s));
console.log('upperCapital(' + s + ') = ' + upperCapital(s));

const capitalize = compose(trim, lower, upperCapital);
console.log('capitalize(' + s + ') = ' + capitalize(s));
