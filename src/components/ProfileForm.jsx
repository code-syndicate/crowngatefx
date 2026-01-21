import { Form, Formik, Field, ErrorMessage } from "formik";
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

  country: Yup.string()
    .required("Country is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  city: Yup.string()
    .required("City is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  zipcode: Yup.number()
    .positive("Zipcode must be a positive number")
    .integer(" Zipcode must be an integer")
    .required("Zipcode is required")
    .typeError("Zipcode must be a number"),
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
});

function ProfileForm({ user }) {
  const [loading, setLoading] = useState(false);

  // console.log("Auth user: ", user);

  async function updateUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.createUser),
      method: "PUT",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Details updated successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/settings";
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
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

    await updateUser(values);

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: user?.email,
          zipcode: "",
          firstName: "",
          lastName: "",
          country: "",
          city: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text2 mb-2 block">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="input-liquid"
                    placeholder="Enter first name"
                  />
                  <p className="text-danger text-xs mt-2">
                    <ErrorMessage name="firstName" />
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-text2 mb-2 block">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="input-liquid"
                    placeholder="Enter last name"
                  />
                  <p className="text-danger text-xs mt-2">
                    <ErrorMessage name="lastName" />
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-text2 mb-2 block">
                  Email Address
                </label>
                <Field
                  readOnly
                  type="email"
                  disabled
                  name="email"
                  className="input-liquid opacity-60 cursor-not-allowed"
                  placeholder="Email Address"
                />
                <p className="text-text3 text-xs mt-2">
                  Email cannot be changed
                </p>
              </div>

              {/* Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text2 mb-2 block">
                    Country
                  </label>
                  <Field
                    type="text"
                    name="country"
                    className="input-liquid"
                    placeholder="Enter country"
                  />
                  <p className="text-danger text-xs mt-2">
                    <ErrorMessage name="country" />
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-text2 mb-2 block">
                    City
                  </label>
                  <Field
                    type="text"
                    name="city"
                    className="input-liquid"
                    placeholder="Enter city"
                  />
                  <p className="text-danger text-xs mt-2">
                    <ErrorMessage name="city" />
                  </p>
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label className="text-sm font-medium text-text2 mb-2 block">
                  Zip Code
                </label>
                <Field
                  type="text"
                  name="zipcode"
                  className="input-liquid"
                  placeholder="Enter zip code"
                />
                <p className="text-danger text-xs mt-2">
                  <ErrorMessage name="zipcode" />
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  disabled={!isValid || loading}
                  className="btn-neon w-full md:w-auto"
                  type="submit"
                >
                  {loading ? <Spinner size="tiny" /> : "Save Changes"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProfileForm;
