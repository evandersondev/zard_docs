# ZBool Schema Documentation

The `ZBool` class is a schema used for validating bool values in the `zard` package. It extends the `Schema<bool>` class.

<br>
<br>

# Constructor `ZBool({String? message})`

Initializes a new instance of `ZBool` with an optional custom error message if the value is not a valid integer.

Example:

```dart
final value = z.bool.parse(true); // returns true
final value = z.bool.parse(false); // returns false

final value = z.bool.parse(1); // returns true
final value = z.bool.parse(0); // returns false

final value = z.bool.parse('1'); // returns true
final value = z.bool.parse('0'); // returns false

final value = z.bool.parse('true'); // returns true
final value = z.bool.parse('false'); // returns false

final value = z.bool.parse(null); // returns false
final value = z.bool.parse(''); // returns false
```
