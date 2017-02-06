<img src="media/logo.png" alt="Transmogrify" width="250" />

> Presenting a foolish implementation of immutability that aspires to ignore the most cherished taboo of not modifying prototypes for unspecified reasons.

## Rules

> Even war has rules.

When the type is an `array`:

* Function hasn't mutated original then return, otherwise:
  * If function returns a non-array, concatenate with original;
  * If function returns an array, spread with the original;
