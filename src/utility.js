/**
 * @method each
 * @param {Object} proto
 * @param {Function} fn
 * @return {void}
 */
export function each(proto, fn) {
    Object.getOwnPropertyNames(proto).forEach(fn);
}

/**
 * @method isFunction
 * @param {*} x
 * @return {Boolean}
 */
export function isFunction(x) {
    return typeof x === 'function';
}

/**
 * @method patch
 * @param {Object} proto
 * @param {String} name
 * @param {Function} fn
 * @return {*}
 */
export function patch(proto, name, fn) {

    Object.defineProperty(proto, name, {
        configurable: false,
        writable: false,
        enumerable: false,
        value: function(...args) {
            return fn(this, ...args);
        }
    });

}

/**
 * @method typeOf
 * @param {*} value
 * @return {Object}
 */
export function typeOf(value) {

    switch (true) {
        case Array.isArray(value):      return Array;
        case typeof value === 'object': return Object;
    }

}

/**
 * @method extend
 * @param {*} value
 * @return {Object}
 */
export function extend(value) {

    const type  = typeOf(value);
    const proto = type['prototype'];

    class Immutable extends Array {}

    each(proto, name => isFunction(proto[name]) && patch(Immutable.prototype, name, (context, ...args) => {

        // Make a copy of the object before making it immutable.
        const extensibleContext = [...context];

        try {

            // Attempt to apply a function which we'll assume doesn't have any side-effects.
            return proto[name].apply(Object.freeze(context), args);

        } catch (e) {

            // However if the function did in fact attempt to mutate the frozen object, then we'll
            // handle that gracefully, and return a tuple of the result and its side-effect.
            const result = proto[name].apply(extensibleContext, args);
            return Object.freeze([extensibleContext, result]);

        }

    }));

    return Object.freeze(Array.isArray(value) ? new Immutable(...value) : new Immutable(value));

}
