'use strict';

const { EventEmitter } = require('node:events');

function AddOnlySet(it) {
  this.set = new Set(it);
  this.emitter = new EventEmitter();
  this.size = it.length;
}

AddOnlySet.prototype.add = function(value) {
  this.set.add(value);
  this.size = this.set.size;
  this.emitter.emit('add', value);
};

AddOnlySet.prototype.on = function(name, listener) {
  this.emitter.on(name, listener);
};

AddOnlySet.prototype.toString = function() {
  return [...this.set.values()].join();
};

// Usage

const s1 = new AddOnlySet(['uno', 'due']);
s1.on('add', (value) => console.log(`Added "${value}"`));
s1.add('tre');
console.dir({ result: s1.toString() });
