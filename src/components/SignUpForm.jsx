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
    <div className="min-h-screen bg-bg1 flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

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
            <Form className="flex flex-col justify-center items-center space-y-8 max-w-md w-full card-nebula px-8 py-12 relative z-10">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-2 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]">
                  <img
                    src={LogoImage.src}
                    alt="Logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                    Create Account
                  </h1>
                  <p className="text-text2 text-sm">Join CrownGate FX today</p>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Field
                    type="text"
                    name="firstName"
                    className="input-liquid"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <Field
                    type="text"
                    name="lastName"
                    className="input-liquid"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>
              </div>

              <div className="w-full space-y-1">
                <Field
                  type="email"
                  name="email"
                  className="input-liquid"
                  placeholder="Email Address"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-danger text-xs pl-1 font-medium"
                />
              </div>

              <div className="w-full space-y-1">
                <Field
                  type="password"
                  name="password1"
                  className="input-liquid"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password1"
                  component="p"
                  className="text-danger text-xs pl-1 font-medium"
                />
              </div>

              <div className="w-full space-y-1">
                <Field
                  type="password"
                  name="password2"
                  className="input-liquid"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="password2"
                  component="p"
                  className="text-danger text-xs pl-1 font-medium"
                />
              </div>

              <div className="w-full pt-4">
                <button
                  disabled={!isValid || loading}
                  className="btn-neon w-full"
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Sign Up"}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-text3">
                  Already have an account?{" "}
                  <a
                    className="text-accent hover:text-accent-glow font-medium transition-colors"
                    href="/sign-in"
                  >
                    Login
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
