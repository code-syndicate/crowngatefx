import { setWithdrawPopup } from "../lib/atoms";
import { BsWallet2, BsGraphUpArrow, BsCashCoin } from "react-icons/bs";
import { BiTrendingUp } from "react-icons/bi";

function Dash({ auth }) {
  const account = auth.user.account;

  function withdraw() {
    setWithdrawPopup({
      show: true,
    });
  }

  return (
    <div className="pt-24 lg:pt-8 pb-32 lg:pb-12 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome & Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-text2 text-sm uppercase tracking-widest font-bold mb-1">
            Portfolio Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Good {new Date().getHours() < 12 ? "Morning" : "Evening"},{" "}
            {auth.user.firstName}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-success bg-success/10 px-3 py-1 rounded-full border border-success/20 animate-pulse">
            ● Live Market Data
          </span>
        </div>
      </div>

      {/* Hero Section: Portfolio Value */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Asset Card */}
        <div className="lg:col-span-2 card-nebula p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-accent/30 transition-all duration-700"></div>

          <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text2 font-medium mb-1">Total Balance</p>
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
                  ${(account.balance + account.bonus).toLocaleString()}
                </h2>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <BsWallet2 className="text-2xl text-accent" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={withdraw} className="btn-neon">
                <BsCashCoin className="text-xl" />
                <span>Withdraw</span>
              </button>
              <a href="/exchanges" className="btn-ghost border border-white/5">
                <BiTrendingUp className="text-xl" />
                <span>Trade Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats Column */}
        <div className="space-y-6">
          {/* Available */}
          <div className="card-glow p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 mb-2 text-text2 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              Available Margin
            </div>
            <p className="text-3xl font-bold text-white font-mono">
              ${account.balance.toLocaleString()}
            </p>
          </div>

          {/* Bonus */}
          <div className="card-glow p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 mb-2 text-text2 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              Trading Bonus
            </div>
            <p className="text-3xl font-bold text-white font-mono">
              ${account.bonus.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Market Watch / Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-nebula p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BsGraphUpArrow className="text-accent" />
            <span>Market Performance</span>
          </h3>
          {/* Placeholder for chart - using CSS visuals */}
          <div className="h-48 w-full flex items-end gap-2 px-2">
            {[40, 65, 30, 80, 55, 90, 70, 45, 60, 75, 50, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-accent/20 rounded-t-sm relative group hover:bg-accent/40 transition-all"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="absolute bottom-0 w-full bg-accent rounded-t-sm group-hover:bg-white transition-all"
                ></div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-text2 mt-4">
            24H Trading Volume Visualization
          </p>
        </div>

        {/* Account Status / Info */}
        <div className="card-nebula p-6 flex flex-col justify-center items-center text-center space-y-4 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center mb-2 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
            <span className="text-2xl font-bold text-white">PRO</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Pro Account Active</h3>
            <p className="text-text2 text-sm max-w-xs mx-auto mt-2">
              You have access to premium leverage and 0% commission trades.
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
