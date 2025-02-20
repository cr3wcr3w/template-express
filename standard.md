# Development Standards

## Naming Conventions

Consistent naming makes the codebase easier to understand and maintain.

- **`kebab-case`** → For all folders and files.
- **`PascalCase`** → For classes and types.
- **`snake_case`** → For database tables and columns.
- **`camelCase`** → For functions, variables, and Zod schemas.

## Documentation

- Always add **JSDoc comments** (`/** */`) for each function, class.
- Provide clear descriptions and type annotations.
- Utilize AI tools to assist in generating JSDoc comments efficiently.

### Example:

```ts
/**
 * Calculates the sum of two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The sum of `a` and `b`.
 */
function add(a: number, b: number): number {
  return a + b;
}
```

## API Versioning

- API endpoints should be versioned to introduce new features without disrupting frontend applications that rely on older versions of the API.
- The version format should be prefixed using api/vX (e.g., api/v1, api/v2).

## Project Structure

```bash
/src/v1
  /config       # Configuration files (e.g., DB, env)
  /middlewares  # Reusable middlewares (e.g., auth, error handling)
  /models       # Database models (if using Sequelize/Mongoose)
  /routes       # Route definitions
  /controllers  # Route handlers (business logic)
  /utils        # Utility functions
  /seed         # Seed data scripts
  index.ts      # App entry point
```

## API Validation

- Always validate input received from the frontend.

```ts
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.coerce.number().optional(),
  isAdmin: z
    .preprocess(
      (val) => (val === "true" ? true : val === "false" ? false : val),
      z.boolean(),
    )
    .optional(),
});

function validateUser(req: any, res: any, next: any) {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  next();
}

app.post("/api/v1/users", validateUser, (req, res) => {
  res.json({ message: "User created successfully", data: req.body });
});
```

## Error Handling

- Always call next() when handling errors in routes

```ts
// Example error route
app.get("/api/v1/error-test", (req, res, next) => {
  next(new Error("Something went wrong!"));
});
```
