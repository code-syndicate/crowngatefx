import BitcoinImage from "../assets/crypto/bitcoin.png";
import EthereumImage from "../assets/crypto/etherium.png";
import DogecoinImage from "../assets/crypto/dogecoin.png";
import BinanceImage from "../assets/crypto/binance.png";
import BitcoinQr from "../assets/qr/bitcoin.jpeg";
import EthereumQr from "../assets/qr/ethereum.jpeg";
import BinanceQr from "../assets/qr/binance.jpeg";

import { setWalletQr } from "../lib/atoms";

const items = [
  {
    image: BitcoinImage,
    title: "Bitcoin",
    key: "bitcoin",
    qr: BitcoinQr,
    addr: "bc1qjdt2uqg5m2lqtankhe9lknqd5vwa58c7cyhdpn",
  },

  {
    image: EthereumImage,
    title: "Ethereum",
    key: "ethereum",
    qr: EthereumQr,
    addr: "0xa8304e8b3b4b01a43368fe912d10085e19472bd8",
  },

  {
    image: DogecoinImage,
    title: "Dogecoin",
    key: "dogecoin",
  },

  {
    image: BinanceImage,
    title: "Binance",
    key: "smartchain",
    addr: "0x18ab89c22699ad4aaa52a1fcef44e4d6486c3834",
    qr: BinanceQr,
  },
];

function Balances({ account }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
      {items.map((v, i) => {
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
                disabled={!v.qr}
                onClick={() => {
                  if (!v.qr) return;
                  setWalletQr({
                    img: v.qr.src,
                    show: true,
                    address: v.addr || "",
                  });
                }}
                className="w-full py-3 rounded-xl border border-accent/30 text-accent font-bold text-sm hover:bg-accent/10 hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-accent/30"
              >
                {v.qr ? "Deposit" : "Coming Soon"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Balances;
