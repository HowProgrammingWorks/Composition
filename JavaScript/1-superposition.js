'use strict';

const { log: ln } = Math;
const pow = Math.pow;
const sqrt = Math.sqrt;
const inc = (x) => ++x;
const add = (a, b) => a + b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;
const log = (base, n) => ln(n) / ln(base);
const iff = (e, x1, x2) => (e ? x1 : x2);
const loop = (from, to, fn) => {
  for (let i = from; i <= to; i++) fn(i);
};

const expr1 = pow(5 * 8, 2) + ((sqrt(20) + 1) / log(2, 7));
console.log(expr1);

const expr2 = add(
  pow(mul(5, 8), 2), div(inc(sqrt(20)), log(2, 7))
);
console.log(expr2);

const expr3 = add(iff(5 > 3, 10, 7), div(1, 2));
console.log(expr3);

console.log('Loop from 5 to 10');
loop(5, 10, console.log);

console.log('Loop from 5 to 10, write < 8');
loop(5, 10, (x) => iff(x < 8, console.log, () => {})(x));
