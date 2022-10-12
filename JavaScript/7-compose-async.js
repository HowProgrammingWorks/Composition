'use strict';

const fs = require('node:fs');

const reduceAsync = (items, performer, done, initialValue) => {
  const nseted = initialValue === undefined;
  let counter = nseted ? 1 : 0;
  let previous = nseted ? items[0] : initialValue;
  let current = nseted ? items[1] : items[0];

  const response = (err, data) => {
    if (!err && counter !== items.length - 1) {
      counter++;
      previous = data;
      current  = items[counter];
      performer(previous, current, response, counter, items);
    } else if (done) {
      done(err, data);
    }
  };

  performer(previous, current, response, counter, items);
};

const last = (arr) => arr[arr.length - 1];

// funcs - array of parametrs for functions
// args - array of functions
// args[i] - function
// args[-1] - done(err, data)
//
const composeAsync = (funcs, ...args) => (
  () => reduceAsync(
    args.slice(0, -1),
    (params, fn, done) => fn(...[].concat(params).concat(done)),
    last(args),
    funcs
  )
);

// Usage

const randomize = (max) => Math.floor((Math.random() * max));

const wrapAsync = (callback) => setTimeout(callback, randomize(1000));

const read = (file, charset, callback) => {
  console.dir({ read: { file, callback } });
  fs.readFile(file, charset, callback);
};

const parse = (data, callback) => {
  console.dir({ parse: { data, callback } });
  wrapAsync(() => {
    callback(null, ['Data has been', 'processed!']);
  });
};

const preprocess = (data1, data2, callback) => {
  console.dir({ preprocess: { data1, data2, callback } });
  wrapAsync(() => {
    callback(null, data1 + ' ' + data2);
  });
};

const cf1 = composeAsync(
  ['config.txt', 'utf8'],
  read,
  parse,
  preprocess,
  (err, data) => {
    if (!err) console.log(data);
  }
);

cf1();
