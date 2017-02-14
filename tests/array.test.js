import test from 'ava';
import { spy } from 'sinon';
import m from '../src/default';

test('Unable to mutate object', t => {
    const a = m(['Adam', 31]);
    const error = t.throws(() => {
        a[2] = 'London';
    }, Error);
    t.is(error.message, `Can't add property 2, object is not extensible`);
});

test('Able to calculate its length;', t => {
    const a = m([1, 2, 3]);
    t.is(a.length, 3);
});

test('Array.prototype.concat', t => {
    const a = m([1, 2, 3]);
    const b = m([4, 5, 6]);
    const c = a.concat(b);
    t.deepEqual(a.concat(b), [1, 2, 3, 4, 5, 6]);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.copyWithin', t => {
    const a = m([1, 2, 3, 4, 5, 6]);
    t.deepEqual(a.copyWithin(2, 1, 4), [[1, 2, 2, 3, 4, 6], [1, 2, 2, 3, 4, 6]]);
    t.deepEqual(a, [1, 2, 3, 4, 5, 6]);
});

test('Array.prototype.entries', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(Array.from(a.entries()), [[0, 1], [1, 2], [2, 3]]);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.every', t => {
    const a = m([1, 2, 3]);
    t.is(a.every(b => typeof b === 'number'), true);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.fill', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.fill(1), [[1, 1, 1], [1, 1, 1]]);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.filter', t => {
    const a = m([1, 2, 3, 4, 5]);
    t.deepEqual(a.filter(b => b > 2), [3, 4, 5]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
});

test('Array.prototype.find', t => {
    const a = m([1, 2, 3]);
    t.is(a.find(b => b === 2), 2);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.findIndex', t => {
    const a = m([1, 2, 3]);
    t.is(a.findIndex(b => b === 2), 1);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.forEach', t => {
    const a = m([1, 2, 3]);
    const f = spy();
    a.forEach(f);
    t.is(f.callCount, 3);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.includes', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.includes(2), true);
    t.deepEqual(a.includes(4), false);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.indexOf', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.indexOf(3), 2);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.join', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.join(' - '), '1 - 2 - 3');
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.keys', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(Array.from(a.keys()), [0, 1, 2]);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.lastIndexOf', t => {
    const a = m([1, 2, 3, 4, 4, 4]);
    t.deepEqual(a.lastIndexOf(4), 5);
    t.deepEqual(a, [1, 2, 3, 4, 4, 4]);
});

test('Array.prototype.map', t => {
    t.pass();
});

test('Array.prototype.pop', t => {
    const a = m([1, 2, 3, 4, 5]);
    t.deepEqual(a.pop(), [[1, 2, 3, 4], 5]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
});

test('Array.prototype.push', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.push(4), [[1, 2, 3, 4], 4]);
    t.deepEqual(a.push([4, 5]), [[1, 2, 3, [4, 5]], 4]);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.reduce', t => {
    t.pass();
});

test('Array.prototype.reduceRight', t => {
    t.pass();
});

test('Array.prototype.reverse', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.reverse(), [[3, 2, 1], [3, 2, 1]]);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.shift', t => {
    const a = m([1, 2, 3, 4, 5]);
    t.deepEqual(a.shift(), [[2, 3, 4, 5], 1]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
});

test('Array.prototype.slice', t => {
    const a = m([1, 2, 3, 4, 5]);
    t.deepEqual(a.slice(1), [2, 3, 4, 5]);
    t.deepEqual(a.slice(2, 4), [3, 4]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
});

test('Array.prototype.some', t => {
    const a = m([1, 2, 3]);
    t.deepEqual(a.some(b => b === 3), true);
    t.deepEqual(a, [1, 2, 3]);
});

test('Array.prototype.sort', t => {
    const a = m([3, 2, 1]);
    t.deepEqual(a.sort((a, b) => a > b), [[1, 2, 3], [1, 2, 3]]);
    t.deepEqual(a, [3, 2, 1]);
});

test('Array.prototype.splice', t => {
    const a = m([1, 2, 3, 4, 5]);
    t.deepEqual(a.splice(1), [[1], [2, 3, 4, 5]]);
    t.deepEqual(a.splice(2, 4), [[1, 2], [3, 4, 5]]);
    t.deepEqual(a, [1, 2, 3, 4, 5]);
});

test('Array.prototype.toLocaleString', t => {
    t.pass();
});

test('Array.prototype.toString', t => {
    const a = m([1, 2, 3]);
    t.is(a.toString(), '1,2,3');
});

test('Array.prototype.unshift', t => {
    const a = m([2, 3]);
    t.deepEqual(a.unshift(1), [[1, 2, 3], 3]);
    t.deepEqual(a.unshift([0, 1]), [[[0, 1], 2, 3], 3]);
    t.deepEqual(a, [2, 3]);
});
