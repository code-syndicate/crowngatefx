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
    <div className="min-h-screen bg-bg1 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

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
                    Welcome Back
                  </h1>
                  <p className="text-text2">
                    Enter your credentials to access the terminal
                  </p>
                </div>
              </div>

              <div className="w-full space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="input-liquid"
                    placeholder="name@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-text2 uppercase tracking-widest">
                      Password
                    </label>
                    <a
                      className="text-xs text-accent hover:text-accent-glow transition-colors font-medium"
                      href="/reset-password"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Field
                    type="password"
                    name="password"
                    className="input-liquid"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>
              </div>

              <div className="w-full pt-4">
                <button
                  disabled={!isValid || loading}
                  className="btn-neon w-full"
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Initiate Session"}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-text3">
                  New to the platform?{" "}
                  <a
                    className="text-accent hover:text-accent-glow font-medium transition-colors"
                    href="/sign-up"
                  >
                    Create Access ID
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
