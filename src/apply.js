import { each, patch, clone, isFunction } from './utility';

/**
 * @method apply
 * @param {Object} proto
 * @return {Function}
 */
export default function apply(proto) {

    const copy = clone(proto);

    each(proto, name => isFunction(proto[name]) && patch(proto, name, (context, ...args) => {

        // Make a copy of the object before making it immutable.
        const extensibleContext = [...context];

        try {

            // Attempt to apply a function which we'll assume doesn't have any side-effects.
            return copy[name].apply(Object.freeze(context), args);

        } catch (e) {

            // However if the function did in fact attempt to mutate the frozen object, then we'll
            // handle that gracefully, and return a tuple of the result and its side-effect.
            const result = copy[name].apply(extensibleContext, args);
            return Object.freeze([extensibleContext, result]);

        }

    }));

    return () => {

        each(copy, name => {
            proto[name] = copy[name];
        });

    };

}
