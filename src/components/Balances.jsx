import BitcoinImage from "../assets/crypto/bitcoin.png";
import EthereumImage from "../assets/crypto/etherium.png";
import DogecoinImage from "../assets/crypto/dogecoin.png";
import BinanceImage from "../assets/crypto/binance.png";

import { setWalletQr } from "../lib/atoms";

const items = [
  {
    image: BitcoinImage,
    title: "Bitcoin",
    key: "bitcoin",
    addr: "bc1qtws30qppepjmj7atkf0wveshy9aeyqqll9utff",
    enabled: true,
  },

  {
    image: EthereumImage,
    title: "Ethereum",
    key: "ethereum",
    addr: "0x2030f0Ed7d5618252Ab489AA7404Fa765C36BdfF",
    enabled: true,
  },

  {
    image: DogecoinImage,
    title: "Dogecoin",
    key: "dogecoin",
    enabled: false,
  },

  {
    image: BinanceImage,
    title: "Binance",
    key: "smartchain",
    enabled: false,
  },
];

function Balances({ account }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
      {items.map((v, i) => {
        const qrUrl = v.enabled
          ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${v.addr}`
          : null;

        return (
          <div
            key={i}
            className="card-nebula p-6 relative group overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -mr-8 -mt-8 transition-opacity opacity-50 group-hover:opacity-100"></div>

            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-text2 font-medium text-sm uppercase tracking-wider">
                    {v.title}
                  </span>
                  <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    ${account[v.key]}
                  </span>
                </div>
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <img
                    src={v.image.src}
                    alt={v.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>

              <button
                disabled={!v.enabled}
                onClick={() => {
                  if (!v.enabled) return;
                  setWalletQr({
                    img: qrUrl,
                    show: true,
                    address: v.addr || "",
                  });
                }}
                className="w-full py-3 rounded-xl border border-accent/30 text-accent font-bold text-sm hover:bg-accent/10 hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-accent/30"
              >
                {v.enabled ? "Deposit" : "Coming Soon"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Balances;
