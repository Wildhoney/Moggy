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
 * @param {String} fn
 * @return {*}
 */
export function patch(proto, fn) {

    const supported = ['push'];

    if (!supported.includes(fn)) {
        return;
    }

    proto[fn] = function(a) {
        return [...this, a];
    };

}
