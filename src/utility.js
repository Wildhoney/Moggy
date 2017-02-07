/**
 * @method each
 * @param {Object} proto
 * @param {Function} name
 * @return {void}
 */
export function each(proto, name) {
    Object.getOwnPropertyNames(proto).forEach(name);
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
 * @method clone
 * @param {Object} proto
 * @return {Object}
 */
export function clone(proto) {

    return Object.getOwnPropertyNames(proto).reduce((xs, name) => {
        return { ...xs, [name]: proto[name] };
    }, {});

}

/**
 * @method patch
 * @param {Object} proto
 * @param {String} name
 * @param {Function} fn
 * @return {*}
 */
export function patch(proto, name, fn) {

    const supported = ['push', 'slice', 'splice', 'pop'];

    if (!supported.includes(name)) {
        return;
    }

    proto[name] = function(...args) {
        return fn([...this], ...args);
    };

}
