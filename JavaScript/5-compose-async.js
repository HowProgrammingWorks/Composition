'use strict';

global.api = {};
api.fs = require('fs');

const reduceAsync = (items, performer, done, initialValue) => {
  const nseted = initialValue === undefined;
  let counter = nseted ? 1 : 0;
  let previous = nseted ? items[0] : initialValue;
  let current = nseted ? items[1] : items[0];

  function response(err, data) {
    if (!err && counter !== items.length - 1) {
      ++counter;
      previous = data;
      current  = items[counter];
      performer(previous, current, response, counter, items);
    } else if (done) {
      done(err, data);
    }
  }

  performer(previous, current, response, counter, items);
};

// funcs - array of parametrs for functions
// args - array of functions
// args[i] - function
// args[-1] - done(err, data)
//
const composeAsync = (funcs, ...args) => (
  () => reduceAsync(
    args.slice(0, -1),
    (params, fn, done) => fn(...[].concat(params).concat(done)),
    args[args.length - 1],
    funcs
  )
);

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

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

function read(file, charset, callback) {
  console.dir({ read: { file, callback } });
  api.fs.readFile(file, charset, callback);
}

function parse(data, callback) {
  console.dir({ parse: { data, callback } });
  wrapAsync(() => {
    callback(null, ['Data has been', 'processed!']);
  });
}

function preprocess(data1, data2, callback) {
  console.dir({ preprocess: { data1, data2, callback } });
  wrapAsync(() => {
    callback(null, data1 + ' ' + data2);
  });
}
