import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { $walletQr, setWalletQr } from "../lib/atoms";
import { useStore } from "@nanostores/react";

export default function WalletDetails() {
  const walletQr = useStore($walletQr);

  const { show, img, address } = walletQr;

  function closeSelf() {
    if (show) {
      setWalletQr({
        show: false,
      });
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeSelf}
      ></div>

      <div className="relative w-full max-w-sm card-nebula p-8 animate-fade-in-up">
        <button
          onClick={closeSelf}
          className="absolute top-4 right-4 text-text2 hover:text-white transition-colors"
        >
          <BsX className="text-2xl" />
        </button>

        <h3 className="text-xl font-bold text-white text-center mb-6">
          Deposit via QR Code
        </h3>

        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white p-2 rounded-xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]">
            <img
              src={img}
              alt="Wallet QR Code"
              className="w-64 h-64 object-cover"
            />
          </div>

          <div className="w-full space-y-2">
            <p className="text-xs text-text2 uppercase tracking-widest text-center font-bold">
              Wallet Address
            </p>
            <div
              className="bg-bg2/80 border border-white/5 rounded-xl p-3 text-center cursor-pointer hover:bg-bg2 transition-colors group relative"
              onClick={() => navigator.clipboard.writeText(address)}
            >
              <p className="text-accent font-mono text-sm break-all">
                {address}
              </p>
              <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-xl font-bold backdrop-blur-sm">
                Click to Copy
              </span>
            </div>
          </div>

          <p className="text-text3 text-xs text-center">
            Scan this code with your wallet app to complete the deposit.
          </p>
        </div>
      </div>
    </div>
  );
}
