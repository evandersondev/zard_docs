# Basic Usage

## Parse

When you want to parse a value, you can use the `parse` method. If the value is valid, it will return the parsed value. If the value is invalid, it will throw an `ZardError` with details about the error.

```dart
final helloSchema = z.string().min(3);
final hello = helloSchema.parse('hello');

print(hello); // Output: hello
```

## Safe Parse

If you want to safely parse a value, you can use the `safeParse` method. It will return a `ZardResult` object. The `ZardResult` will contain a success bool key, the parsed value in data key and a `ZardError` in the error key.

```dart
final intSchema = z.int().min(0).max(10);
final result = intSchema.safeParse(5);

if(result.success) {
    print(result.data); // Output: 5
} else {
    print(result.error.messages); // Output: ["Messages error"]
}
```

## Parse Async

If you want to parse a value asynchronously, you can use the `parseAsync` method. It will return a `Future` that will resolve to the parsed value. If the value is invalid, it will throw an `ZardError` with details about the error.

```dart
Future<int> getAge() async {
    return Future.value(20);
}

final intSchema = z.int().min(0).max(10);
final age = await intSchema.parseAsync(getAge());

print(age); // Output: 20
```

## Parse Async Safe

If you want to safely parse a value asynchronously, you can use the `safeParseAsync` method. It will return a `Future` that will resolve to a `ZardResult` object. The `ZardResult` will contain a success bool key, the parsed value in data key and a `ZardError` in the error key.

```dart
Future<int> getAge() async {
    return Future.value(20);
}

final intSchema = z.int().min(0).max(10);
final result = await intSchema.safeParseAsync(getAge());

if(result.success) {
    print(result.data); // Output: 20
} else {
    print(result.error.messages); // Output: ["Messages error"]
}
```

## Error Handling

All validation methods will throw a `ZardError` with information about the validation failure if the value does not pass validation.
