![Moggy](media/logo.png)

> <sub><sup>*moggy → transmogrify → "transform in a surprising or magical manner."*</sup></sub><br />
> Miniature ~2kb library that brings immutability to existing prototype functions employing the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

## Getting Started

Moggy inspects the `prototype` of the value and creates an `object` that takes the functions from the prototype &ndash; it's therefore not easy to say *which* functions Moggy implements, since ECMAScript functions that mutate the value will respond with a tuple of `[sideEffect, returnValue]`, whereas functions that are already immutable in their nature will respond as-is.

```javascript
import m from 'moggy';

const a = m([1, 2, 3]);
const b = a.push(4); 
const c = a.pop();

console.log(a); // [1, 2, 3]
console.log(b); // [sideEffect = [1, 2, 3, 4], returnValue = 4]
console.log(c); // [sideEffect = [1, 2], returnValue = 3]
```

In such cases it's not always obvious which value you may require &ndash; that's why Moggy returns both as a tuple. In the case of `push` you're more likely to require `sideEffect`, however in `pop` you're more likely to require the `returnValue`.

Using destructuring it's easy to take what you need &ndash; ignoring what you don't need.

```javascript
import m from 'moggy';

const a = m([1, 2, 3]);
const [b] = a.push(4);
const [, c] = a.pop();

console.log(a); // [1, 2, 3]
console.log(b); // [1, 2, 3, 4]
console.log(c); // 3
```
