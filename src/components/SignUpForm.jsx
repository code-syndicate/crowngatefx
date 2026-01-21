import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
  password1: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),

  password2: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password1 === value;
    }),
});

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function createUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.createUser),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Account created successfully",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/sign-in";
          // redirect('/sign-in')
        },
        onAcceptText: "Sign In",
      });
    } else {
      setError("Something went wrong");
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res.error?.message,
        allowclose: true,
      });
    }
  }

  async function handleSubmit(values) {
    setLoading(true);
    setError(null);
    setUser(null);

    await createUser(values);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg1 flex flex-col justify-center items-center py-12 px-4">
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-6 max-w-md w-full glass-panel px-8 py-10 rounded-2xl relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-theme to-transparent opacity-50"></div>

              <div className="flex flex-col items-center space-y-2 pb-2">
                <img src={LogoImage.src} alt="Logo" className="w-16 mb-2" />
                <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Create Account
                </h1>
                <p className="text-text1/50 text-sm">Join CrownGate FX</p>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Field
                    type="text"
                    name="firstName"
                    className="field"
                    placeholder="First Name"
                  />

                  <p className="text-red-400 text-xs pl-1">
                    <ErrorMessage name="firstName" />
                  </p>
                </div>

                <div className="space-y-1">
                  <Field
                    type="text"
                    name="lastName"
                    className="field"
                    placeholder="Last Name"
                  />

                  <p className="text-red-400 text-xs pl-1">
                    <ErrorMessage name="lastName" />
                  </p>
                </div>
              </div>

              <div className="w-full space-y-1">
                <Field
                  type="email"
                  name="email"
                  className="field"
                  placeholder="Email Address"
                />

                <p className="text-red-400 text-xs pl-1">
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className="w-full space-y-1">
                <Field
                  type="password"
                  name="password1"
                  className="field"
                  placeholder="Password"
                />

                <p className="text-red-400 text-xs pl-1">
                  <ErrorMessage name="password1" />
                </p>
              </div>

              <div className="w-full space-y-1">
                <Field
                  type="password"
                  name="password2"
                  className="field"
                  placeholder="Confirm Password"
                />

                <p className="text-red-400 text-xs pl-1">
                  <ErrorMessage name="password2" />
                </p>
              </div>

              <div className="w-full pt-4">
                <button
                  disabled={!isValid || loading}
                  className="btn-primary w-full text-base font-medium py-3"
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Sign Up"}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-text1/60">
                  Already have an account?{" "}
                  <a
                    className="text-theme hover:underline font-medium"
                    href="/sign-in"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUpForm;
