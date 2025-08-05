# ZEnum Schema Documentation

The `ZEnum` class is a schema used for validating integer values in the `zard` package. It extends the `Schema<List<String>>` base class and provides additional methods for validating enums.

<br>
<br>

# Constructor `ZEnum(ist<String> enum, {String? message})`

Initializes a new instance of `ZEnum` with an optional custom error message if the value is not a valid enum.

Example:

```dart
final map = z.$enum$(['a', 'b', 'c'].parse('a'));
// returns 'a'
```

---

# Methods

## `extract`

> extract(List<String> list);

Extract value from enum transform.

Example:

```dart
final schema = z.$enum$(['a', 'b', 'c']);

final map = schema.extract(['a', 'b']);
// returns ['a', 'b']
```

---

## `exclude`

> exclude(List<String> list);

Exclude value from enum transform.

Example:

```dart
final schema = z.$enum$(['a', 'b', 'c']);

final map = schema.exclude(['a', 'b']);
// returns ['c']
```

---
