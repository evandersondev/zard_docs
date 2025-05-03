# Advanced Schema Documentation

Can be used to validate more complex schemas, custom validation rules, transformations, and more.

<br>
<br>

## `inferType`

> inferType({
> required dynamic Function(Map<String, dynamic>) fromMap,
> required Schema<Map<String, dynamic>> mapSchema
> });

Can return a custom classe based on the data provided.

Example:

```dart
final userSchema = z.inferType(
    fromMap: (json) => User.fromMap(json), // Custom class fromMap method
    mapSchema: z.map({
        'name': z.string().min(3),
        'email': z.string().email(),
    }),
);

final user = userSchema.parse({
    'name': 'John Doe',
    'email': 'john.doe@example.com',
});
// user is an instance of User class

print('User created: ${user.name}, ${user.email}');
```

---

## `transformTyped`

> transformTyped(R Function(T value) transformer);

Can return a custom classe based on the data provided.

Example:

```dart
final schema = z.interface({
    'name': z.string().min(3).max(20),
    'email': z.string().email(),
}).transformTyped((json) => User.fromMap(json)) // Custom class fromMap method

final user = schema.parse({
    'name': 'John Doe',
    'email': 'john.doe@example.com',
});
// user is an instance of User class

print('User created: ${user.name}, ${user.email}');
```

---

## `lazy`

> lazy(Schema<dynamic> Function() schemaThunk);

Can use lazy schema to avoid circular dependencies.

Example:

```dart
Schema<User> getUserSchema() {
    return z.interface({
        'name': z.string().min(3).max(20),
        'email': z.string().email(),
        'friends?': z.lazy(() => getUserSchema().list()), // Lazy schema
    }).transformTyped((json) => User.fromMap(json));
}

  final user = getUserSchema().parse({
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'friends': [
      {
        'name': 'Jane Doe',
        'email': 'jane.doe@example.com',
        'friends': [
          {
            'name': 'Evan Doe',
            'email': 'john.doe@example.com',
          },
        ],
      },
    ],
  });
// user is an instance of User class

print(user?.friends.first.friends.first.name);
```

> `z.lazy(() => getUserSchema().list())` use the same instance of the schema and convert key to `z.list(z.map({'name': z.string().min(3).max(20), 'email': z.string().email()}))`.

---

## `transform`

> transform(dynamic Function(T value) transformer);

Can return a custom classe based on the data provided.

Example:

```dart
final schema = z.string().transform((value) => value.toUpperCase());
final result = schema.parse('hello'); // returns 'HELLO'
```

## `refine`

> refine(bool Function(T value) predicate, {String? message});

Validates that the value satisfies the provided predicate function.

Example:

```dart
final schema = z.string().refine((value) => value.length > 5);
final result = schema.parse('hello'); // returns 'HELLO'
final result = schema.parse('hi'); // returns ZardError
```

## `coerce`

> coerce({String? message});

Converts the value to a schema type definition.

Example:

```dart
z.coerce.double().parse("25"); // returns 25.0
z.coerce.string().parse(123); // returns '123'
z.coerce.boolean().parse(""); // returns false
z.coerce.int().parse(1000); // returns 1000
z.coerce.date().parse("2021-10-05"); // returns DateTime
```

## Full Example:

```dart
import 'package:zard/zard.dart';

final userSchema = z.map({
    'name': z.string().transform((value) => value.toUpperCase()),
    'age': z.int(),
    'sallary': z.double(),
    'email': z.string().email(message: 'Deve ser um email válido'),
    'tags': z.list(z.string().transform((value) => '#$value')),
    'birthday': z.date().optional(),
    'addresses': z.list(
      z.map({
        'street': z.string(),
        'city': z.string().transform((value) => value.toUpperCase()),
      }),
    ),
  });

  final user = userSchema.parse({
    'name': 'John Doe',
    'age': 30,
    'sallary': 5000.0,
    'email': 'john.doe@example.com',
    'tags': ['#dart', '#flutter'],
    'birthday': DateTime.now(),
    'addresses': [
      {'street': '123 Main St', 'city': 'SPRINGFIELD'},
      {'street': '456 Elm St', 'city': 'SHELBYVILLE'},
    ],
  });

  print(user);
```
