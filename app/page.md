# Overview

<p align="center">
    <img src="https://raw.githubusercontent.com/evandersondev/zard/main/assets/logo.png" width="200px" align="center" alt="Zard logo" /> <a href="https://pub.dev/packages/zard"><h4 align="center">Zard on pub.dev</h4></a> <br/> <p align="center"> Zard is a powerful and expressive schema validation and transformation library for Dart, inspired by the <a href="https://github.com/colinhacks/zod">Zod</a> library from the JavaScript ecosystem. </p>
</p>

Zard makes it easy to define strict validation rules for your Dart objects using an intuitive and chainable API.

Whether you're building Flutter apps, working with APIs, or validating user input, Zard provides the tools you need to ensure your data is clean and reliable — both synchronously and asynchronously.

## ✨ Features

- Fully typed schema definitions.
- Synchronous and asynchronous parsing (parse, safeParse, parseAsync, safeParseAsync).
- Detailed and structured error reporting.
- Chainable validations (e.g., .min(), .max(), .email()).
- Deep validations for maps and lists.
- Custom validation with refine() for complex logic.
- Inspired by Zod, tailored for Dart and Flutter.

## 🚀 Quick Example

```dart
import 'package:zard/zard.dart';

final schema = z.string().min(3).email(message: "Invalid email");

final result = schema.safeParse("hi@zard.dev");

if (result['success']) {
  print("✅ Valid: ${result.data}");
} else {
  print("❌ Errors: ${result.error}");
}
```

## 📦 Installation

```yaml
dependencies:
  zard: ^0.0.13
```

Then, install:

```bash
dart pub get
# or
dart pub add zard
```

## ❤️ Support

If you find Zard helpful, please consider supporting its development:

🌟 [Buy Me a Coffee](https://buymeacoffee.com/evandersondev)

---

Made with ❤️ for Dart & Flutter developers.
