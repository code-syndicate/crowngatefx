import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { $notify, setNotifyMessage } from "../lib/atoms";
import { useStore } from "@nanostores/react";

export default function Notify() {
  const notifyState = useStore($notify);

  const {
    content,
    title,
    show,
    working,
    onAccept,
    onAcceptText,
    onReject,
    onRejectText,
    allowClose = true,
  } = notifyState;

  function closeSelf() {
    if (show && !working) {
      setNotifyMessage({
        show: false,
      });
    }
  }

  function handleAccept() {
    closeSelf();
    if (onAccept) {
      onAccept();
    }
  }

  function handleReject() {
    handleClose();
    if (notify.onReject) {
      notify.onReject();
    }
  }

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-fade-in-up w-full max-w-sm px-4 lg:px-0">
      <div className="relative w-full card-nebula p-6 border-l-4 border-l-accent shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {allowClose && (
            <button
              onClick={closeSelf}
              className="text-text2 hover:text-white transition-colors"
            >
              <BsX className="text-xl" />
            </button>
          )}
        </div>

        <p className="text-text2 mb-6 leading-relaxed text-sm">{content}</p>

        <div className="flex justify-end gap-3">
          {onReject && (
            <button
              onClick={handleReject}
              disabled={working}
              className="px-4 py-2 rounded-xl text-sm font-medium text-text2 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
            >
              {onRejectText || "Cancel"}
            </button>
          )}
          {onAccept && (
            <button
              onClick={handleAccept}
              disabled={working}
              className="btn-neon px-6 py-2 text-sm disabled:opacity-50"
            >
              {onAcceptText || "Proceed"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
