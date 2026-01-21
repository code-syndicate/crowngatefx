import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
  password: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),
});

function SignInForm() {
  const [loading, setLoading] = useState(false);

  async function loginUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.logIn),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Log in successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/dashboard";
        },
        onAcceptText: "Proceed to dashboard",
      });
    } else {
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

    await loginUser(values);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg1 flex flex-col justify-center items-center p-4">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-6 max-w-md w-full glass-panel px-8 py-10 rounded-2xl relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-theme to-transparent opacity-50"></div>

              <div className="flex flex-col items-center space-y-2 pb-4">
                <img src={LogoImage.src} alt="Logo" className="w-16 mb-2" />
                <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-text1/50 text-sm">
                  Sign in to manage your portfolio
                </p>
              </div>

              <div className="w-full space-y-2">
                <label className="text-xs font-semibold text-text1/60 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="field"
                  placeholder="Enter your email"
                />
                <p className="text-red-400 text-xs pt-1 pl-1">
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold text-text1/60 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    className="text-xs text-theme hover:text-theme/80 transition-colors"
                    href="/reset-password"
                  >
                    Forgot password?
                  </a>
                </div>
                <Field
                  type="password"
                  name="password"
                  className="field"
                  placeholder="Enter your password"
                />
                <p className="text-red-400 text-xs pt-1 pl-1">
                  <ErrorMessage name="password" />
                </p>
              </div>

              <div className="w-full pt-4">
                <button
                  disabled={!isValid || loading}
                  className="btn-primary w-full text-base font-medium py-3"
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Sign In"}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-text1/60">
                  Don't have an account?{" "}
                  <a
                    className="text-theme hover:underline font-medium"
                    href="/sign-up"
                  >
                    Create account
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

export default SignInForm;
