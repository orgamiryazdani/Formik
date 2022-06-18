import { useFormik } from "formik";
import * as Yup from "yup";
import CheckBoxInput from "./common/CheckBoxInput";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectComponent from "./common/SelectComponent";

const checkBoxOptions = [
  { label: "React.js", value: "React.js" },
  { label: "Vue.js", value: "Vue.js" },
];

const radioOption = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const selectOptions = [
  { id: 1, label: "Iran", value: "IR" },
  { id: 2, label: "Germany", value: "GER" },
  { id: 3, label: "USA", value: "US" },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(3, "name length is not valid"),
  email: Yup.string()
    .email("invalid email format")
    .required("email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "invalid phone number")
    .nullable(),
  password: Yup.string().required("password is required"),
  passwordConfirm: Yup.string()
    .required("password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Please select a country"),
  intrests: Yup.array().min(1).required("at least one expertise"),
  terms: Yup.boolean()
    .required("the terms and conditions must be accepted.")
    .oneOf([true], "the terms and conditions must be accepted"),
});

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  intrests: [],
  terms: false,
  country: "",
};

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div className="formik">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />

        <Input formik={formik} name="email" label="Email" />

        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />

        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />

        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirm"
          type="password"
        />

        <RadioInput formik={formik} radioOptions={radioOption} name="gender" />

        <SelectComponent
          options={selectOptions}
          id="country"
          name="country"
          formik={formik}
        />

        <div className="check">
          <CheckBoxInput
            formik={formik}
            checkBoxOptions={checkBoxOptions}
            name="intrests"
          />

          <div className="conditions">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value={true}
              onChange={formik.handleChange}
              checked={formik.values.terms}
            />
            <label htmlFor="terms">I agree with the terms and conditions</label>
          </div>
        </div>

        {formik.errors.terms && formik.touched.terms && (
          <div className="error">{formik.errors.terms}</div>
        )}

        <button type="submit">submit</button>
      </form>
      <div className="img">
        <div className="image">
          <div className="opacity">Formik</div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
