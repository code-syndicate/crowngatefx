import { BsX, BsShieldLock, BsBank, BsWallet2 } from "react-icons/bs";
import { useStore } from "@nanostores/react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import {
  setWithdrawPopup,
  $withdrawPopup,
  setNotifyMessage,
} from "../lib/atoms";
import cn from "classnames";

const schema = Yup.object().shape({
  amount: Yup.number()
    .positive("Amount must be a positive number")
    .moreThan(10, "Amount must be at least $10")
    .required("Amount is required")
    .typeError("Amount must be a number"),
  method: Yup.string().required(),
  // Crypto Validations
  address: Yup.string().when("method", {
    is: "crypto",
    then: (schema) =>
      schema.required("Wallet address is required").min(20, "Invalid address"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // Bank Validations
  bankName: Yup.string().when("method", {
    is: "bank",
    then: (schema) => schema.required("Bank Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountName: Yup.string().when("method", {
    is: "bank",
    then: (schema) => schema.required("Account Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  bankNumber: Yup.string().when("method", {
    is: "bank",
    then: (schema) => schema.required("Account Number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  swift: Yup.string().when("method", {
    is: "bank",
    then: (schema) => schema.required("SWIFT/Sort Code is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function WithdrawPopup({ user }) {
  const [loading, setLoading] = useState(false);
  const { show } = useStore($withdrawPopup);
  const wallets = config.wallets || [
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "usdt", name: "USDT (TRC20)" },
  ];
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const [activeTab, setActiveTab] = useState("crypto");

  async function withdrawReq(values) {
    const payload = {
      ...values,
      channel: values.method,
      wallet:
        values.method === "crypto"
          ? selectedWallet?.id || "bitcoin"
          : undefined,
    };

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.withdraw),
      method: "POST",
      body: JSON.stringify(payload),
    });

    setWithdrawPopup({
      show: false,
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Your withdrawal is being processed.",
        allowclose: true,
        onAccept: () => {
          window.location.reload();
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res.error?.message || res.errorMessage,
        allowclose: true,
      });
    }
  }

  async function handleSubmit(values) {
    if (values.amount > user.account.balance + user.account.bonus) {
      setNotifyMessage({
        show: true,
        title: "Insufficient funds",
        content: "You do not have enough balance to initiate this withdrawal.",
        allowclose: true,
      });
      return;
    }

    setLoading(true);
    await withdrawReq(values);
    setLoading(false);
  }

  function closeSelf() {
    if (show) {
      setWithdrawPopup({
        show: false,
      });
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeSelf}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg card-nebula p-8 animate-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={closeSelf}
          className="absolute top-4 right-4 text-text2 hover:text-white transition-colors"
        >
          <BsX className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <BsShieldLock className="text-accent" />
          <span>Withdraw Funds</span>
        </h2>

        {/* Tabs */}
        <div className="flex p-1 bg-surface2/50 rounded-xl mb-6 backdrop-blur-sm border border-white/5">
          <button
            className={cn(
              "flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300",
              activeTab === "crypto"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-text2 hover:text-white hover:bg-white/5",
            )}
            onClick={() => setActiveTab("crypto")}
          >
            <BsWallet2 className="text-lg" />
            <span>Crypto Wallet</span>
          </button>
          <button
            className={cn(
              "flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300",
              activeTab === "bank"
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "text-text2 hover:text-white hover:bg-white/5",
            )}
            onClick={() => setActiveTab("bank")}
          >
            <BsBank className="text-lg" />
            <span>Bank Transfer</span>
          </button>
        </div>

        <Formik
          validationSchema={schema}
          initialValues={{
            amount: "",
            address: "",
            method: activeTab,
            bankName: "",
            accountName: "",
            bankNumber: "",
            swift: "",
          }}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isValid, values, setFieldValue }) => {
            // Update method in formik when tab changes
            if (values.method !== activeTab) {
              setFieldValue("method", activeTab);
            }

            return (
              <Form className="space-y-6">
                {/* Amount Field (Common) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2">
                      $
                    </span>
                    <Field
                      type="number"
                      name="amount"
                      className="input-liquid pl-8"
                      placeholder="0.00"
                    />
                  </div>
                  <ErrorMessage
                    name="amount"
                    component="p"
                    className="text-danger text-xs pl-1 font-medium"
                  />
                  <p className="text-xs text-text3 text-right">
                    Available: $
                    {(
                      user.account.balance + user.account.bonus
                    ).toLocaleString()}
                  </p>
                </div>

                {/* Crypto Fields */}
                {activeTab === "crypto" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                        Select Network
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {wallets.map((w) => (
                          <button
                            type="button"
                            key={w.id}
                            onClick={() => setSelectedWallet(w)}
                            className={cn(
                              "flex items-center justify-center py-3 px-2 rounded-xl border transition-all duration-300 text-sm font-bold",
                              selectedWallet?.id === w.id
                                ? "bg-accent/20 border-accent text-white shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)]"
                                : "bg-surface2/50 border-transparent text-text2 hover:bg-surface2 hover:text-white",
                            )}
                          >
                            {w.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                        Wallet Address
                      </label>
                      <Field
                        type="text"
                        name="address"
                        className="input-liquid"
                        placeholder={`Enter your ${selectedWallet?.name || "Crypto"} address`}
                      />
                      <ErrorMessage
                        name="address"
                        component="p"
                        className="text-danger text-xs pl-1 font-medium"
                      />
                    </div>
                  </>
                )}

                {/* Bank Fields */}
                {activeTab === "bank" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                        Bank Name
                      </label>
                      <Field
                        type="text"
                        name="bankName"
                        className="input-liquid"
                        placeholder="e.g. Chase Bank"
                      />
                      <ErrorMessage
                        name="bankName"
                        component="p"
                        className="text-danger text-xs pl-1 font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                        Account Name
                      </label>
                      <Field
                        type="text"
                        name="accountName"
                        className="input-liquid"
                        placeholder="Beneficiary Name"
                      />
                      <ErrorMessage
                        name="accountName"
                        component="p"
                        className="text-danger text-xs pl-1 font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                        Account Number
                      </label>
                      <Field
                        type="text"
                        name="bankNumber"
                        className="input-liquid"
                        placeholder="Account / IBAN Number"
                      />
                      <ErrorMessage
                        name="bankNumber"
                        component="p"
                        className="text-danger text-xs pl-1 font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-text2 uppercase tracking-widest ml-1">
                        SWIFT / Sort Code
                      </label>
                      <Field
                        type="text"
                        name="swift"
                        className="input-liquid"
                        placeholder="Routing / SWIFT Code"
                      />
                      <ErrorMessage
                        name="swift"
                        component="p"
                        className="text-danger text-xs pl-1 font-medium"
                      />
                    </div>
                  </div>
                )}

                <button
                  disabled={!isValid || loading}
                  className="btn-neon w-full py-4 text-base"
                  type="submit"
                >
                  {loading ? <Spinner size="small" /> : "Confirm Withdrawal"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
