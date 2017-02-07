import { each, patch, isFunction } from './utility';

/**
 * @method apply
 * @param {Object} proto
 * @return {Function}
 */
export default function apply(proto) {

    const copy = Object.getOwnPropertyNames(proto).reduce((xs, f) => {
        return { ...xs, [f]: proto[f] };
    }, {});

    each(proto, fn => isFunction(proto[fn]) && patch(proto, fn));

    return () => {

        each(copy, fn => {
            proto[fn] = copy[fn];
        });

    };

}
