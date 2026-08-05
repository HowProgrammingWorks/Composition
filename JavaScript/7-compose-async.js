'use strict';

const fs = require('node:fs');

const reduceAsync = (items, performer, done, initialValue) => {
  const nested = initialValue === undefined;
  let counter = nested ? 1 : 0;
  let previous = nested ? items[0] : initialValue;
  let current = nested ? items[1] : items[0];

  const response = (err, data) => {
    if (!err && counter !== items.length - 1) {
      counter++;
      previous = data;
      current = items[counter];
      performer(previous, current, response, counter, items);
    } else if (done) {
      done(err, data);
    }
  };

  performer(previous, current, response, counter, items);
};

const last = (arr) => arr[arr.length - 1];

// funcs - array of parameters for functions
// args - array of functions
// args[i] - function
// args[-1] - done(err, data)
//
const composeAsync = (funcs, ...args) => {
  const fns = args.slice(0, -1);
  const done = last(args);
  const performer = (params, fn, next) => {
    const allArgs = [].concat(params).concat(next);
    fn(...allArgs);
  };
  return () => reduceAsync(fns, performer, done, funcs);
};

// Usage

const randomize = (max) => Math.floor(Math.random() * max);

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
    callback(null, `${data1} ${data2}`);
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
