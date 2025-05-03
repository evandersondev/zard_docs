# ZDouble Schema Documentation

The `ZDouble` class is a schema used for validating double values in the `zard` package. It extends the `Schema<double>` class.

<br>
<br>

# Constructor `ZDouble({String? message})`

Initializes a new instance of `ZDouble` with an optional custom error message if the value is not a valid integer.

Example:

```dart
final value = z.double.parse(7.0); // returns 7.0
```

---

# Methods

## `min`

> min(int length, {String? message});

Validates that the double has at least the specified minimum number of characters.

Example:

```dart
final schema = z.double().min(10);
final number = schema.parse(15.0);  // returns 15.0
final number = schema.parse(5.0);  // returns ZardError
```

---

## `max`

> max(int length, {String? message});

Validates that the double has no more than the specified maximum number of characters.

Example:

```dart
final schema = z.double().max(10);
final number = schema.parse(5.0);  // returns 5.0
final number = schema.parse(15.0);  // returns ZardError
```

---

## `positive`

> positive({String? message});

Validates that the double is positive (> 0.0).

Example:

```dart
final schema = z.double().positive();
final number = schema.parse(5.0);  // returns 5
final number = schema.parse(-5.0);  // returns ZardError
```

---

## `nonnegative`

> nonnegative({String? message});

Validates that the double is nonnegative (>= 0.0).

Example:

```dart
final schema = z.double().nonnegative();
final number = schema.parse(5.0);  // returns 5
final number = schema.parse(0.0);  // returns 0
final number = schema.parse(-5.0);  // returns ZardError
```

---

## `negative`

> negative({String? message});

Validates that the double is negative (< 0).

Example:

```dart
final schema = z.double().negative();
final number = schema.parse(-5.0);  // returns -5.0
final number = schema.parse(10.0);  // returns ZardError
```

---

## `multipleOf`

> multipleOf(int divisor, {String? message})

Validates that the double is a multiple of the specified divisor.

Example:

```dart
final schema = z.double().multipleOf(3);
final number = schema.parse(6.0);  // returns 6.0
final number = schema.parse(9.0);  // returns 9.0
final number = schema.parse(7.0);  // returns ZardError
```

---

## `step`

> step(int stepValue, {String? message})

Alist Validates that the int is a divisible by the specified step value.
