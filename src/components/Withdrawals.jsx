import React, { useEffect } from "react";
import { fetchUtil, makeUrl } from "../lib/utils";
import config from "../config";
import { setNotifyMessage } from "../lib/atoms";
import { useState } from "react";
import Spinner from "./Spinner";
import EditWithdraw from "./EditWithdraw";

function WithdrawalsList({ authUser }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [editObj, setEditObj] = useState({
    show: false,
    data: null,
  });

  async function approveWithdrawal(id) {
    if (!confirm("Approve withdrawal request?")) {
      return;
    }

    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminApprove),
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Approval successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/admin?v=1";
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res?.error?.message || res?.errorMessage,
        allowclose: true,
      });
    }

    setLoading(false);
  }

  async function deleteWithdrawal(id) {
    if (!confirm("Delete withdrawal request?")) {
      return;
    }

    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminWithdraw),
      method: "PATCH",
      body: JSON.stringify({
        id,
      }),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Deletion successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/admin?v=1";
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res?.error?.message || res?.errorMessage,
        allowclose: true,
      });
    }

    setLoading(false);
  }

  async function getWithdrawals(page = 1) {
    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminWithdraw),
      method: "POST",
      body: JSON.stringify({
        page,
      }),
    });

    if (res.success) {
      setWithdrawals(res.data);
    } else {
      setErr(res?.error?.message || res?.errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    getWithdrawals();
  }, []);

  return (
    <div className="py-4">
      <div className="w-full">
        <div className="space-y-6">
          {loading && (
            <div className="py-16">
              <Spinner size="small" />
            </div>
          )}
          {err && (
            <div className="py-16 space-y-6 flex flex-col justify-center items-center">
              <p className="text-center text-red-500">{err}</p>

              <button
                onClick={() => {
                  location.reload();
                }}
                disabled={loading}
                className="bg-text1/80 max-w-[200px] hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                type="button"
              >
                Retry
              </button>
            </div>
          )}

          {editObj.show && (
            <EditWithdraw
              data={editObj.data}
              closeMe={() => {
                setEditObj({
                  ...editObj,
                  show: false,
                });
              }}
            />
          )}

          {!loading &&
            withdrawals &&
            !editObj.show &&
            withdrawals.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>Withdrawals</span>
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                      {withdrawals.length}
                    </span>
                  </h3>
                </div>

                <div className="w-full overflow-hidden card-nebula">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-text2 uppercase text-xs font-bold tracking-wider">
                      <tr>
                        <th className="py-4 px-6">S/N</th>
                        <th className="py-4 px-6">Client</th>
                        <th className="py-4 px-6">Amount</th>
                        <th className="py-4 px-6">Mode</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6">Details</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {withdrawals.map((w, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/5 transition-colors duration-200"
                        >
                          <td className="py-4 px-6 text-text2 font-mono text-sm">
                            {i + 1}
                          </td>
                          <td className="py-4 px-6 text-white text-sm">
                            {w.user.email}
                          </td>
                          <td className="py-4 px-6 text-white font-bold">
                            ${w.amount}
                          </td>
                          <td className="py-4 px-6 text-text2 text-sm capitalize">
                            {w.payoutMode}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={cn(
                                "px-2 py-1 rounded-md text-xs font-bold uppercase",
                                {
                                  "bg-warning/20 text-warning":
                                    w.status === "pending",
                                  "bg-success/20 text-success":
                                    w.status === "approved" ||
                                    w.status === "completed",
                                  "bg-danger/20 text-danger":
                                    w.status === "declined",
                                },
                              )}
                            >
                              {w.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-text2 text-xs">
                            {new Date(w.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 text-xs text-text2 max-w-[200px] truncate">
                            {w.wallet
                              ? `${w.wallet}: ${w.address}`
                              : `${w.bankName} - ${w.bankNumber}`}
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            {w.status === "pending" && (
                              <button
                                onClick={() => approveWithdrawal(w._id)}
                                className="text-xs bg-success/10 text-success hover:bg-success/20 px-3 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wide"
                              >
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setEditObj({ show: true, data: w })
                              }
                              className="text-xs bg-accent/10 text-accent hover:bg-accent/20 px-3 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wide"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteWithdrawal(w._id)}
                              className="text-xs bg-danger/10 text-danger hover:bg-danger/20 px-3 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wide"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          <div className="py-16 space-y-6 flex flex-col justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalsList;
