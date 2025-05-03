# ZInt Schema Documentation

The `ZInt` class is a schema used for validating integer values in the `zard` package. It extends the `Schema<int>` base class and provides a variety of validation methods for integers.

<br>
<br>

# Constructor `ZInt({String? message})`

Initializes a new instance of `ZInt` with an optional custom error message if the value is not a valid integer.

Example:

```dart
final value = z.int.parse(7); // returns 7
```

---

# Methods

## `min`

> min(int length, {String? message});

Validates that the int has at least the specified minimum number of characters.

Example:

```dart
final schema = z.int().min(10);
final number = schema.parse(15);  // returns 15
final number = schema.parse(5);  // returns ZardError
```

---

## `max`

> max(int length, {String? message});

Validates that the int has no more than the specified maximum number of characters.

Example:

```dart
final schema = z.int().max(10);
final number = schema.parse(5);  // returns 5
final number = schema.parse(15);  // returns ZardError
```

---

## `positive`

> positive({String? message});

Validates that the int is positive (> 0).

Example:

```dart
final schema = z.int().positive();
final number = schema.parse(5);  // returns 5
final number = schema.parse(-5);  // returns ZardError
```

---

## `nonnegative`

> nonnegative({String? message});

Validates that the int is nonnegative (>= 0).

Example:

```dart
final schema = z.int().nonnegative();
final number = schema.parse(5);  // returns 5
final number = schema.parse(0);  // returns 0
final number = schema.parse(-5);  // returns ZardError
```

---

## `negative`

> negative({String? message});

Validates that the int is negative (< 0).

Example:

```dart
final schema = z.int().negative();
final number = schema.parse(-5);  // returns -5
final number = schema.parse(10);  // returns ZardError
```

---

## `multipleOf`

> multipleOf(int divisor, {String? message})

Validates that the int is a multiple of the specified divisor.

Example:

```dart
final schema = z.int().multipleOf(3);
final number = schema.parse(6);  // returns 6
final number = schema.parse(9);  // returns 9
final number = schema.parse(7);  // returns ZardError
```

---

## `step`

> step(int stepValue, {String? message})

Alist Validates that the int is a divisible by the specified step value.

Example:

```dart
final schema = z.int().step(3);
final number = schema.parse(6);  // returns 6
final number = schema.parse(9);  // returns 9
final number = schema.parse(7);  // returns ZardError
```

---
