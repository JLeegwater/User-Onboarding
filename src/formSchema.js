// Here goes the schema for the form
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be 3 characters long"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  tos: yup.boolean().oneOf([true], "Please agree to our Terms of Service"),
});

export default formSchema;
