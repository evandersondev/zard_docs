# ZList Schema Documentation

The `ZList` class is a schema used for validating integer values in the `zard` package. It extends the `Schema<List>` base class and provides a variety of validation methods for lists.

<br>
<br>

# Constructor `ZList(Schema schema, {String? message})`

Initializes a new instance of `ZList` with an optional custom error message if the value is not a valid list.

Example:

```dart
final value = z.list(z.string()).parse(['hello', 'world']);
// returns ['hello', 'world'];
```

---

# Methods

## `noempty`

> noempty({String? message});

Validates that the list is not empty.

Example:

```dart
final schema = z.list(z.int()).noempty();
final number = schema.parse([15]);  // returns 15
final number = schema.parse([]);  // returns ZardError
```

---

## `min`

> min(int lenght, {String? message});

Validates that the list has at least the specified minimum number of items.

Example:

```dart
final schema = z.list(z.int()).min(2);
final number = schema.parse([1, 2, 3]);  // returns [1, 2, 3]
final number = schema.parse([1, 2]);  // returns ZardError
```

---

## `max`

> max(int lenght, {String? message});

Validates that the list has at least the specified maximum number of items.

Example:

```dart
final schema = z.list(z.int()).max(2);
final number = schema.parse([1, 2]);  // returns [1, 2, 3]
final number = schema.parse([1, 2, 3]);  // returns ZardError
```

---

## `length`

> length(int lenght, {String? message});

Validates that the list has at least the specified number of items.

Example:

```dart
final schema = z.list(z.int()).length(2);
final number = schema.parse([1, 2]);  // returns [1, 2, 3]
final number = schema.parse([1]);  // returns ZardError
final number = schema.parse([1, 2, 3]);  // returns ZardError
```

---
