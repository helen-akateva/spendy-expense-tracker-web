import * as Yup from "yup";
import { ALLOWED_EMAIL_DOMAINS } from "./emailDomains";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .max(64, "Email must be at most 64 characters")
    .required("Email is required")
    .test(
      "email-domain",
      `Email must end with ${ALLOWED_EMAIL_DOMAINS.join(", ")}`,
      (value) => {
        if (!value) return false;

        const lower = value.toLowerCase();

        return ALLOWED_EMAIL_DOMAINS.some((domain) => lower.endsWith(domain));
      },
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),
});
