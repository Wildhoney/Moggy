import test from 'ava';
import m from '../src/default';

test('Unable to mutate object', t => {
    const a = m({ name: 'Adam', age: 31 });
    const error = t.throws(() => {
        a.location = 'London';
    }, Error);
    t.is(error.message, `Can't add property location, object is not extensible`);
});
