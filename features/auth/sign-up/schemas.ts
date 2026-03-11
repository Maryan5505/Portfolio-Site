import { z } from "zod";

// Масив допустимих країн для прикладу
const countries = ["Ukraine", "USA", "Poland", "Germany", "France"];

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required and must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),

  surname: z
    .string()
    .min(2, "Surname is required and must be at least 2 characters")
    .max(10, "Surname must be at most 10 characters"),

  username: z
    .string()
    .min(3, "Username is required and must be at least 3 characters")
    .max(15, "Username must be at most 15 characters"),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters"),

  phone: z
    .string()
    .min(10, "Phone is required and must be at least 10 digits")
    .max(20, "Phone must be at most 20 digits"),

  country: z
    .string()
    .min(2, "Country is required")
    .max(15, "Country name too long")
    .refine((val) => countries.includes(val), {
      message: "Country must be a valid option",
    }),

  hobby: z.string().min(3, "Hobby is required").max(20, "Hobby too long"),
});
