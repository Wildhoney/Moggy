import test from 'ava';
import apply from '../src/apply';

test('Array.prototype.push', t => {
    const revert = apply(Array.prototype);
    const a = [1, 2, 3];
    t.deepEqual(a.push(4), [1, 2, 3, 4]);
    t.deepEqual(a.push([4, 5]), [1, 2, 3, [4, 5]]);
    t.deepEqual(a, [1, 2, 3]);
    revert();
});
