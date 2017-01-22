'use strict';

const compose = (...funcs) => (...args) => (
  funcs.reduce((args, fn) => [fn(...args)], args)
);

const s = '   MARCUS AURELIUS   ';
console.log(s);
console.log('lower(' + s + ') = ' + lower(s));
console.log('upperCapital(' + s + ') = ' + upperCapital(s));

const capitalize = compose(trim, lower, upperCapital);
console.log('capitalize(' + s + ') = ' + capitalize(s));

function upperCapital(s) {
  return s.replace(/\w+/g, (word) =>
     word.charAt(0).toUpperCase() + word.substr(1)
  );
}

function lower(s) {
  return typeof(s) === 'string' ? s.toLowerCase() : '';
}

function trim(s) {
  return s.trim();
}
