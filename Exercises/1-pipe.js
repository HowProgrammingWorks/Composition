'use strict';

const pipe = (...fns) => {
    for (const funct of fns) {
        if (typeof funct !== 'function') {
            throw new Error('It is not a function ');
        } else {
            return x => fns.reduce((v, f) => f(v), x);
        }
    }

};

module.exports = { pipe };
