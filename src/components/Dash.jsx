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
    <div className="px-4 lg:pt-8 space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-text1/50">Welcome back to Insured Growth FX</p>
        </div>

        <button
          onClick={withdraw}
          disabled={account.bonus + account.balance < 100}
          className="btn-primary"
        >
          <BsCashCoin className="text-xl" />
          <span>Withdraw Funds</span>
        </button>
      </div>

      {/* Balances Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Balance */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-bg2/40 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BsWallet2 className="text-6xl text-theme" />
          </div>

          <div className="flex flex-col space-y-4 relative z-10">
            <div className="flex items-center space-x-3 text-text1/70">
              <div className="p-2 bg-theme/10 rounded-lg text-theme">
                <BsWallet2 className="text-xl" />
              </div>
              <span className="font-medium">Main Balance</span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight block">
                ${account.balance.toLocaleString()}
              </span>
              <span className="text-xs text-theme flex items-center space-x-1">
                <BiTrendingUp />
                <span>Available for trading</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bonus Balance */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-bg2/40 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BsGraphUpArrow className="text-6xl text-blue-500" />
          </div>

          <div className="flex flex-col space-y-4 relative z-10">
            <div className="flex items-center space-x-3 text-text1/70">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <BsGraphUpArrow className="text-xl" />
              </div>
              <span className="font-medium">Bonus Balance</span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight block">
                ${account.bonus.toLocaleString()}
              </span>
              <span className="text-xs text-blue-400 flex items-center space-x-1">
                <span>Active bonus funds</span>
              </span>
            </div>
          </div>
        </div>

        {/* Total Balance */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-gradient-to-br from-theme/10 to-blue-500/10 border-theme/20">
          <div className="flex flex-col space-y-4 relative z-10">
            <div className="flex items-center space-x-3 text-text1/70">
              <div className="p-2 bg-white/10 rounded-lg text-white">
                <BsCashCoin className="text-xl" />
              </div>
              <span className="font-medium text-white/90">Total Value</span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight block">
                ${(account.bonus + account.balance).toLocaleString()}
              </span>
              <p className="text-xs text-text1/50">Combined portfolio value</p>
            </div>

            <div className="pt-2">
              <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-theme to-blue-500 h-full w-[70%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
