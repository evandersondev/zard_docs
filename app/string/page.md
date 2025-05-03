# ZString Schema Documentation

The `ZString` class is a schema used for validating string values in the `zard` package. It extends the `Schema<String>` base class and provides a variety of validation methods for strings.

<br>
<br>

# Constructor `ZString({String? message})`

Initializes a new instance of `ZString` with an optional custom error message if the value is not a valid string.

Example:

```dart
final value = z.string.parse("Hello"); // returns "Hello"
```

---

# Methods

## `min`

> min(int length, {String? message});

Validates that the string has at least the specified minimum number of characters.

Example:

```dart
final minSchema = z.string().min(3);
final name = minSchema.parse("John"); // returns "John"
final name = minSchema.parse("Jo");   // returns ZardError
```

---

## `max`

> max(int length, {String? message});

Validates that the string has no more than the specified maximum number of characters.

Example:

```dart
final maxSchema = z.string().max(10);
final name = maxSchema.parse("short"); // returns "short"
final name = maxSchema.parse("this string is too long");  // returns ZardError
```

---

## `length`

> length(int length, {String? message});

Validates that the string has exactly the specified length.

Example:

```dart
final lengthSchema = z.string().length(5);
final value = lengthSchema.parse('Hello'); // returns "Hello"
final value = lengthSchema.parse('Hi');  // returns ZardError
```

---

## `email`

> email({String? message});

Validates that the string is in a valid email format.

Example:

```dart
final emailSchema = z.string().email();
final email = emailSchema.parse("john@example.com"); // returns "john@example.com"
final email = emailSchema.parse("john@example");  // returns ZardError
```

---

## `url`

> url({String? message});

Validates that the string is a valid URL.

Example:

```dart
final urlSchema = z.string().url();
final url = urlSchema.parse("https://example.com"); // returns the URL
final url = urlSchema.parse("invalid-url");  // return ZardError
```

---

## `startsWith`

> startsWith(String prefix, {String? message});

Validates that the string starts with the specified prefix.

Example:

```dart
final startsWithSchema = z.string().startsWith("Hello");
final result = startsWithSchema.parse("Hello world"); // returns "Hello world"
final result = startsWithSchema.parse("world Hello");  // returns ZardError
```

---

## `endsWith`

> ndsWith(String suffix, {String? message});

Validates that the string ends with the specified suffix.

Example:

```dart
final endsWithSchema = z.string().endsWith("world");
final result = endsWithSchema.parse("Hello world"); // returns "Hello world"
final result = endsWithSchema.parse("world Hello"); // returns ZardError
```

---

## `regex`

> regex(RegExp pattern, {String? message});

Validates that the string matches a specific regular expression.

Example:

```dart
final regexSchema = z.string().regex(RegExp(r'^\d{3}-\d{2}-\d{4}\$'));
final result = regexSchema.parse("123-45-6789"); // returns the string
final result = regexSchema.parse("abc"); // returns ZardError
```

---

## `date`

> date({String? message});

Validates that the string is in the format YYYY-MM-DD.

Example:

```dart
final dateSchema = z.string().date();
final value = dateSchema.parse('2024-04-19'); // returns 2024-04-19
final value = dateSchema.parse('2021-01-01T12:30:00'); // returns ZardError
```

---

## `datetime`

> datetime({String? message});

Validates that the string is a valid ISO 8601 datetime format.

Example:

```dart
final datetimeSchema = z.string().datetime();
final value = datetimeSchema.parse('2025-04-19T15:30:00'); // returns 2025-04-19T15:30:00
final value = datetimeSchema.parse('19/04/2025 15:30'); // returns ZardError
```

---

## `time`

> time({String? message});

Validates that the string is a valid time format (HH:mm:ss).

Example:

```dart
final timeSchema = z.string().time();
final value = timeSchema.parse('12:00:00'); // returns 2025-04-19T15:30:00
final value = timeSchema.parse('12:00'); // returns ZardError
```

---

## `uuid`

> uuid({String? message});

Validates that the string is a valid UUID (version 4).

Example:

```dart
final uuidSchema = z.string().uuid();
final value = uuidSchema.parse('550e8400-e29b-41d4-a716-446655440000');
// returns 550e8400-e29b-41d4-a716-446655440000
final value = uuidSchema.parse('invalid-uuid'); // returns ZardError
```

---

## `cuid`

> cuid({String? message});

Validates that the string is a valid CUID (Compact Unique IDentifier).

Example:

```dart
final cuidSchema = z.string().cuid();
final cuid = cuidSchema.parse('abcdefghijklmnopqrst'); // returns abcdefghijklmnopqrst
final cuid = cuidSchema.parse('short'); // returns ZardError
```

---

## `cuid2`

> cuid2({String? message});

Validates that the string is a valid CUID2 (Compact Unique IDentifier version 2).

Example:

```dart
final cuidSchema = z.string().cuid2();
final cuid2 = cuidSchema.parse('abcdefghijklmnopqrstuvwxxy');
// returns abcdefghijklmnopqrst
final cuid2 = cuidSchema.parse('short'); // returns ZardError
```

---

## `contains`

> contains(String substring, {String? message});

Validates that the string contains the specified substring.

Example:

```dart
final containsSchema = z.string().contains('test');
final value = containsSchema.parse('this is a test'); // returns "this is a test"
final value = containsSchema.parse('no match here');  // returns ZardError
```

---

## Full Example Usage

```dart
final emailSchema = z.string().min(3).max(100).email().endsWith('@example.com');
final email = emailSchema.parse("john@example.com");
```
