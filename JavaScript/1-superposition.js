'use strict';

let pow = Math.pow;
let sqrt = Math.sqrt;
let inc = x => ++x;
let add = (a, b) => a + b;
let mul = (a, b) => a * b;
let div = (a, b) => a / b;
let log = (base, n) => Math.log(n) / Math.log(base);
let iff = (e, x1, x2) => e ? x1 : x2;
let loop = (from, to, fn) => {
  for (let i = from; i <= to; i++) fn(i);
};

let expr1 = pow(5 * 8, 2) + ((sqrt(20) + 1) / log(2, 7));
console.log(expr1);

let expr2 = add(pow(mul(5, 8), 2), div(inc(sqrt(20)), log(2, 7)));
console.log(expr2);

let expr3 = add(iff(5 > 3, 10, 7), div(1, 2));
console.log(expr3);

console.log('Loop from 5 to 10');
loop(5, 10, console.log);

console.log('Loop from 5 to 10, write < 8');
loop(5, 10, x => iff(x < 8, console.log, () => {})(x));
