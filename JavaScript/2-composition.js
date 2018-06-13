'use strict';

const compose = (f1, f2) => x => f2(f1(x));

// Usage

const upperCapital = s => s.replace(
  /\w+/g, word => word.charAt(0).toUpperCase() + word.substr(1)
);

const lower = s => (typeof(s) === 'string' ? s.toLowerCase() : '');

const s = 'MARCUS AURELIUS';
console.log(s);
console.log('lower(' + s + ') = ' + lower(s));
console.log('upperCapital(' + s + ') = ' + upperCapital(s));

const capitalize = compose(lower, upperCapital);
console.log('capitalize(' + s + ') = ' + capitalize(s));
