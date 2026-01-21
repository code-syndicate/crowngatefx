import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Current Password is required"),

  password1: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("New Password is required"),

  password2: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("New Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password1 === value;
    }),
});

function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);

  async function changePassword(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.changePassword),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Password changed successfully.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/sign-in";
          // redirect('/sign-in')
        },
        onAcceptText: "Proceed to log in",
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

    await changePassword(values);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg1 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      <Formik
        validationSchema={schema}
        initialValues={{
          password: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-6 max-w-md w-full card-nebula px-8 py-10 relative z-10">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-2 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]">
                  <img
                    src={LogoImage.src}
                    alt="Logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                    Change Password
                  </h1>
                  <p className="text-text2 text-sm">
                    Enter your current and new password
                  </p>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                    Current Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="input-liquid"
                    placeholder="Enter current password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="password1"
                    className="input-liquid"
                    placeholder="Enter new password"
                  />
                  <ErrorMessage
                    name="password1"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                    Confirm New Password
                  </label>
                  <Field
                    type="password"
                    name="password2"
                    className="input-liquid"
                    placeholder="Confirm new password"
                  />
                  <ErrorMessage
                    name="password2"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                </div>
              </div>

              <div className="w-full pt-2">
                <button
                  disabled={!isValid || loading}
                  className="btn-neon w-full"
                  type="submit"
                >
                  {loading ? <Spinner size="tiny" /> : "Change Password"}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-text3">
                  <a
                    className="text-accent hover:text-accent-glow font-medium transition-colors"
                    href="/settings"
                  >
                    ← Back to Settings
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

export default ChangePasswordForm;
