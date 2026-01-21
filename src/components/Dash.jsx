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
    <div className="min-h-screen">
      {/* Mobile App-like Header */}
      <div className="lg:hidden bg-surface/50 backdrop-blur-xl sticky top-0 z-40 px-5 py-4 border-b border-white/5">
        <p className="text-text2 text-xs uppercase tracking-widest font-bold">
          Portfolio
        </p>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Hi, {auth.user.firstName}
        </h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-8 pt-4 max-w-7xl mx-auto">
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

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto space-y-6">
        {/* Hero Balance Card - Full width on mobile */}
        <div className="card-nebula p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text2 text-sm font-medium mb-1">
                  Total Balance
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">
                  ${(account.balance + account.bonus).toLocaleString()}
                </h2>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <BsWallet2 className="text-2xl text-accent" />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={withdraw}
                className="btn-neon flex-1 lg:flex-none"
              >
                <BsCashCoin className="text-lg" />
                <span>Withdraw</span>
              </button>
              <a
                href="/exchanges"
                className="btn-ghost border border-white/10 flex-1 lg:flex-none"
              >
                <BiTrendingUp className="text-lg" />
                <span>Trade</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats - Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 scrollbar-hide">
          <div className="card-glow p-5 min-w-[200px] lg:min-w-0 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2 text-text2 text-xs font-bold uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              Available
            </div>
            <p className="text-2xl font-bold text-white font-mono">
              ${account.balance.toLocaleString()}
            </p>
          </div>

          <div className="card-glow p-5 min-w-[200px] lg:min-w-0 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2 text-text2 text-xs font-bold uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              Bonus
            </div>
            <p className="text-2xl font-bold text-white font-mono">
              ${account.bonus.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="card-nebula p-5 lg:p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <BsGraphUpArrow className="text-accent" />
            <span>Market Performance</span>
          </h3>
          <div className="h-32 lg:h-48 w-full flex items-end gap-1 lg:gap-2">
            {[40, 65, 30, 80, 55, 90, 70, 45, 60, 75, 50, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-accent/10 rounded-t-sm relative"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="absolute bottom-0 w-full bg-accent rounded-t-sm"
                ></div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-text2 mt-3">
            24H Trading Volume
          </p>
        </div>

        {/* Account Status - Mobile friendly */}
        <div className="card-nebula p-6 flex items-center gap-4 lg:flex-col lg:items-center lg:text-center lg:py-8">
          <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] flex-shrink-0">
            <span className="text-lg lg:text-2xl font-bold text-white">
              PRO
            </span>
          </div>
          <div>
            <h3 className="text-base lg:text-xl font-bold text-white">
              Pro Account Active
            </h3>
            <p className="text-text2 text-xs lg:text-sm mt-1">
              Premium leverage & 0% commission trades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
