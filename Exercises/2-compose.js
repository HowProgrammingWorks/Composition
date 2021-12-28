'use strict';

const compose = (...fns) => {
    const errs = [];
    const composed = x => {
        if (fns.length === 0) return x;
        const last = fns.length;
        let res = x;
        try {
            for (let i = last - 1; i >= 0; i--) {
                res = fns[i](res);
            }
            return res;
        } catch (error) {
            for (const err of errs) {
                err(error);
            }
        }
    };
    composed.on = (name, err) => {
        if (name === 'error') errs.push(err);
    };
    return composed;
};

module.exports = { compose };
