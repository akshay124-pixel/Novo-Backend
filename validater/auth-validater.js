const z = require("zod");

const loginSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters" })
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not exceed 255 characters" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must not exceed 255 characters" })
    .optional(),
});

const signupSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must not exceed 255 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(10, { message: "Phone must not exceed 10 characters" }),
});

module.exports = { signupSchema, loginSchema };
