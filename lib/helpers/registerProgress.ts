import { FormikErrors, FormikTouched } from "formik";

type Values = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function getRegisterProgress(
  values: Values,
  touched: FormikTouched<Values>,
  errors: FormikErrors<Values>,
) {
  const fields: (keyof Values)[] = [
    "name",
    "email",
    "password",
    "confirmPassword",
  ];

  const validFields = fields.filter((field) => {
    return touched[field] && !errors[field] && values[field].trim().length > 0;
  });

  return {
    validCount: validFields.length,
    percent: validFields.length * 25,
  };
}
