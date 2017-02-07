import test from 'ava';
import apply from '../src/apply';

// test('Array.prototype.concat', t => {
//     const revert = apply(Array.prototype);
//     const a = [1, 2, 3];
//     t.deepEqual(a.concat(4), [1, 2, 3, 4]);
//     t.deepEqual(a.concat([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
//     t.deepEqual(a, [1, 2, 3]);
//     revert();
// });

test('Array.prototype.push', t => {
    const revert = apply(Array.prototype);
    const a = [1, 2, 3];
    t.deepEqual(a.push(4), [1, 2, 3, 4]);
    t.deepEqual(a.push([4, 5]), [1, 2, 3, [4, 5]]);
    t.deepEqual(a, [1, 2, 3]);
    revert();
});

test('Array.prototype.slice', t => {
    const revert = apply(Array.prototype);
    const a = [1, 2, 3, 4, 5];
    t.deepEqual(a.slice(1), [2, 3, 4, 5]);
    t.deepEqual(a.slice(2, 4), [3, 4]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
    revert();
});

test('Array.prototype.splice', t => {
    const revert = apply(Array.prototype);
    const a = [1, 2, 3, 4, 5];
    t.deepEqual(a.splice(1), [1]);
    t.deepEqual(a.splice(2, 4), [1, 2]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
    revert();
});
