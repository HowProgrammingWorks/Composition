'use strict';

// Define the type "function, that takes one argument
// and returnes the value of the same type"
type oneArg<T> = (arg: T) => T;

// Construct the "pipe" so it suits the exercise requirements
const pipe = <T>(...fns: oneArg<T>[]): oneArg<T> =>
  x => fns.reduce((v, f) => f(v), x);


// Usage

const inc = (x: number) => ++x;
const twice = (x: number) => x * 2;
const cube = (x: number) => Math.pow(x, 3);

// You cannot do:
//
// const wrongFunc = x => 'someString';
// pipe(inc, twice, wrongFunc);

// Also you cannot do:
//
// const wrongFunc = (x, y) => x + y;
// pipe(inc, twice, wrongFunc);

// Because wrongFunc does not suit the type
// (arg: T) => T

const f = pipe(inc, twice, cube);
console.log(f(5));

