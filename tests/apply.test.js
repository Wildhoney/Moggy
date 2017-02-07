import test from 'ava';
import apply from '../src/apply';

test('makes all Array.prototype functions immutable;', t => {

    const revert = apply(Array.prototype);

    const a = [1, 2, 3];
    const b = a.push(4);

    t.deepEqual(b, [1, 2, 3, 4]);

    revert();

});
