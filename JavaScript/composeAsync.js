'use strict';

global.api = {};
api.fs = require('fs');

let reduceAsync = function(items, performer, callback, initialValue) {
  var nseted = (typeof(initialValue) === 'undefined'),
      counter = nseted ? 1 : 0,
      previous = nseted ? items[0] : initialValue,
      current = nseted ? items[1] : items[0];

  function response(err, data) {
    if (!err && counter !== items.length - 1) {
      ++counter;
      previous = data;
      current  = items[counter];
      performer(previous, current, response, counter, items);
    } else if (callback) {
      callback(err, data);
    }
  }

  performer(previous, current, response, counter, items);
};

// params - array of parametrs for functions
// args - array of functions
// args[i] - function
// args[-1] - callback(err, data)
//
function composeAsync(params, ...args) {
  reduceAsync(
    args.slice(0, -1),
    (params, fn, callback) => fn.apply(
      null, [].concat(params).concat(callback)
    ),
    args[args.length - 1],
    params
  );
}

composeAsync(
  ['config.txt', 'utf8'],
  read,
  parse,
  preprocess,
  (err, data) => {
    if (!err) console.log(data);
  }
);

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
