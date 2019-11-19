'use strict';

const compose = (...fns) => x => {
  if (fns.length === 0) return x;

  const last = fns.length - 1;
  let res = fns[last](x);
  for (let i = last - 1; i >= 0; i--) {
    res = fns[i](res);
  }
  return res;
};

const pipe = (...fns) => x => {
  if (fns.length === 0) return x;

  let res = fns[0](x);
  for (let i = 1; i < fns.length; i++) {
    res = fns[i](res);
  }
  return res;
};

// Usage

const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);
const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
const lower = s => s.toLowerCase();
const trim = s => s.trim();

const s = '   MARCUS AURELIUS   ';
console.log(s);
console.log(`lower('${s}') = '${lower(s)}'`);
console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);

{
  console.log('Use compose');
  const capitalize = compose(upperCapital, lower, trim);
  console.log(`capitalize('${s}') = '${capitalize(s)}'`);
}
{
  console.log('Use pipe');
  const capitalize = pipe(trim, lower, upperCapital);
  console.log(`capitalize('${s}') = '${capitalize(s)}'`);
}
