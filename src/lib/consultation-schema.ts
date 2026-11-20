import { z } from "zod";

export const SERVICE_OPTIONS = [
  "AI Automation",
  "Lead Management Systems",
  "Workflow Integration",
  "Custom Digital Solutions",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: `Must be less than ${max} characters` })
    .optional()
    .or(z.literal(""));

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  company: optionalText(120),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone must be less than 30 characters" })
    .regex(/^[+\d\s().-]*$/, { message: "Use digits, spaces and + ( ) - only" })
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, { errorMap: () => ({ message: "Choose a service" }) }),
  budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: "Choose a budget range" }) }),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Pick a valid date" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell us a little more (at least 10 characters)" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
