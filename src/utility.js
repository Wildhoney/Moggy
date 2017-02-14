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
 * @param {*} a
 * @return {Boolean}
 */
export function isFunction(a) {
    return typeof a === 'function';
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

        /**
         * @constant configurable
         * @type {Boolean}
         */
        configurable: false,

        /**
         * @constant writable
         * @type {Boolean}
         */
        writable: false,

        /**
         * @constant enumerable
         * @type {Boolean}
         */
        enumerable: false,

        /**
         * @method value
         * @param {*} args
         * @return {*}
         */
        value: function(...args) {
            return fn(this, ...args);
        }

    });

}

/**
 * @method extend
 * @param {*} value
 * @return {Object}
 */
export function extend(value) {

    /**
     * @constant prototype
     * @type {Object}
     */
    const { prototype } = value.constructor;

    /**
     * @class Immutable
     * @extends {Function} value.constructor
     */
    class Immutable extends value.constructor {}

    each(prototype, name => isFunction(prototype[name]) && patch(Immutable.prototype, name, (context, ...args) => {

        // Make a copy of the object which removes the immutability.
        const extensibleContext = [...context];

        try {

            // Attempt to apply a function which we'll assume doesn't have any side-effects.
            return prototype[name].apply(context, args);

        } catch (e) {

            // However if the function did in fact attempt to mutate the frozen object, then we'll
            // handle that gracefully, and return a tuple of the result and its side-effect.
            const result = prototype[name].apply(extensibleContext, args);
            return Object.freeze([extensibleContext, result]);

        }

    }));

    return Object.freeze(Array.isArray(value) ? new Immutable(...value) : new Immutable(value));

}
