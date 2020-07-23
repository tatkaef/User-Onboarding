import * as yup from "yup";

const FormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is Required"),
  password: yup
    .string()
    .min(6, "Username must be at least 6 characters")
    .required("Username is Required"),
  //   termsOfService: yup.boolean().required("You need check the Box"),
});

export default FormSchema;

// Name
// Email
// Password
// Terms of Service (checkbox)
