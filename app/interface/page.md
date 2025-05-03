# ZInterface Schema Documentation

The `ZInterface` class is a schema used for validating integer values in the `zard` package. It extends the `Schema<Map>` class and provides methods for validating map values.

<br>
<br>

# Constructor `ZInterface(Map<String, Schema<dynamic>> rawSchemas, {String? message})`

Initializes a new instance of `ZInterface` you can write a interface sintaxe and it will be converted to a map of schemas with a `nullable` flag.

Example:

```dart
final schema = z.interface({
    'name': z.string().min(3).max(20),
    'email': z.string().email(),
    'friends?': z.list(z.int()),
});

// This will converted to:
final schema = z.map({
    'name': z.string().min(3).max(20),
    'email': z.string().email(),
    'friends': z.list(z.int()).nullable(),
});
```

---
