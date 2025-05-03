# ZMap Schema Documentation

The `ZMap` class is a schema used for validating integer values in the `zard` package. It extends the `Schema<Map>` base class and provides additional methods for validating maps.

<br>
<br>

# Constructor `ZMap(Schema schema, {String? message})`

Initializes a new instance of `ZMap` with an optional custom error message if the value is not a valid map.

Example:

```dart
final map = z.map({
    'name': z.string(),
}).parse({
    'name': 'John Doe',
});
// returns {'name': 'John Doe'}
```

---

# Methods

## `strict`

> strict();

Validates that the map contains only the specified keys.

Example:

```dart
final schema = z.map({
    'name': z.string(),
    'age': z.number(),
}).strict();

final map = schema.parse({
    'name': 'John Doe',
    'age': 30,
});
// returns {'name': 'John Doe', 'age': 30}

final map = schema.parse({
    'name': 'John Doe',
    'age': 30,
    'email': 'john@example.com',
});
// returns ZardError
```

---

## `refine`

> refine(bool Function(Map<String, dynamic> value) predicate, {String? message});

Validates that the map refines the given predicate.

Example:

```dart
final schema = z.map({
    'name': z.string(),
    'age': z.number(),
}).refine((value) => value['age'] > 18);

final map = schema.parse({
    'name': 'John Doe',
    'age': 30,
});
// returns {'name': 'John Doe', 'age': 30}

final map = schema.parse({
    'name': 'John Doe',
    'age': 12,
});
// returns ZardError
```

---

## `keyof`

> keyof();

Retourns a list of keys of the map.

Example:

```dart
final schema = z.map({
    'name': z.string(),
    'age': z.number(),
});

final keys = schema.keyof();
// returns ['name', 'age']
```

---

## `pick`

> pick(List<String> keys);

Use .pick to create a new schema that only includes the specified keys.

Example:

```dart
final schema = z.map({
    'name': z.string(),
    'age': z.number(),
});

final newSchema = schema.pick(['name']);
// returns {'name': z.string()}
```

---

## `omit`

> omit(List<String> keys);

Use .omit to create a new schema that excludes the specified keys.

Example:

```dart
final schema = z.map({
    'name': z.string(),
    'age': z.number(),
});

final newSchema = schema.omit(['name']);
// returns {'age': z.number()}
```

---

## Full Example Usage

```dart
final schema = z.map({
  'name': z.string().min(3),
  'age': z.int().min(18).nullable(),
  'email': z.string().email(),
  'isActive': z.bool().nullable(),
});

final map = schema.parse({
  'name': 'John Doe',
  'age': 30,
  'email': 'john.doe@example.com',
  'address': '123 Main St',
  'isActive': true,
});

print(map);
```
