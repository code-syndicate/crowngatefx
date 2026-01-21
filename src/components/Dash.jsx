import { setWithdrawPopup } from "../lib/atoms";
import { BsWallet2, BsGraphUpArrow, BsCashCoin } from "react-icons/bs";
import { BiTrendingUp } from "react-icons/bi";
import { useState, useEffect } from "react";

function Dash({ auth }) {
  const account = auth.user.account;

  // Seeded random based on date (consistent for the day)
  const getDateSeed = () => {
    const today = new Date();
    return (
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate()
    );
  };

  const seededRandom = (seed, index = 0) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  // Generate initial chart data based on today's date
  const generateInitialData = () => {
    const seed = getDateSeed();
    return Array.from(
      { length: 16 },
      (_, i) => Math.floor(seededRandom(seed, i) * 50) + 35,
    );
  };

  // Generate initial percentage based on today's date
  const generateInitialPercent = () => {
    const seed = getDateSeed();
    const value = seededRandom(seed, 100) * 6 - 1; // Range: -1 to +5
    return {
      value: Math.abs(value).toFixed(2),
      positive: value >= 0,
    };
  };

  const initialPercent = generateInitialPercent();

  // Dynamic chart data
  const [chartData, setChartData] = useState(generateInitialData);
  const [percentChange, setPercentChange] = useState(initialPercent.value);
  const [isPositive, setIsPositive] = useState(initialPercent.positive);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update chart data periodically with smooth animation indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);

      // Slightly modify chart data (+/- 10% variation from current values)
      setChartData((prev) =>
        prev.map((val) => {
          const change = (Math.random() - 0.5) * 20; // +/- 10
          return Math.max(25, Math.min(95, Math.floor(val + change)));
        }),
      );

      // Small percentage change (+/- 0.5%)
      setPercentChange((prev) => {
        const change = (Math.random() - 0.5) * 0.8;
        const newVal = Math.max(0, parseFloat(prev) + change);
        return newVal.toFixed(2);
      });

      // Occasionally flip positive/negative (10% chance)
      if (Math.random() < 0.1) {
        setIsPositive((prev) => !prev);
      }

      // Reset animation indicator
      setTimeout(() => setIsUpdating(false), 300);
    }, 3000); // Update every 3 seconds for more noticeable updates

    return () => clearInterval(interval);
  }, []);

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
      <div className="hidden lg:block px-8 pt-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Good {new Date().getHours() < 12 ? "Morning" : "Evening"},{" "}
          {auth.user.firstName}
        </h1>
        <p className="text-text2 mt-1">Here's an overview of your portfolio.</p>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Hero Balance Card */}
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
        <div
          className={`card-nebula p-5 lg:p-6 transition-all duration-300 ${isUpdating ? "ring-1 ring-accent/30" : ""}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BsGraphUpArrow
                  className={`text-accent transition-transform duration-300 ${isUpdating ? "scale-110" : ""}`}
                />
                <span>Market Performance</span>
              </h3>
              <p className="text-text3 text-xs mt-1 flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isUpdating ? "bg-accent animate-ping" : "bg-success"}`}
                ></span>
                Live • Updates every 3s
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold transition-all duration-300 ${isPositive ? "text-success" : "text-danger"} ${isUpdating ? "scale-105" : ""}`}
              >
                {isPositive ? "+" : "-"}
                {percentChange}%
              </p>
              <p className="text-text3 text-xs">vs yesterday</p>
            </div>
          </div>

          {/* Chart Bars */}
          <div className="h-32 lg:h-40 w-full flex items-end gap-1 lg:gap-1.5">
            {chartData.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-accent/20 hover:bg-accent/30 transition-all cursor-pointer group relative"
                style={{ height: "100%" }}
              >
                <div
                  className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ${
                    isPositive
                      ? "bg-gradient-to-t from-accent to-accent/70 group-hover:from-white group-hover:to-accent"
                      : "bg-gradient-to-t from-danger to-danger/70 group-hover:from-white group-hover:to-danger"
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>

          {/* Chart Labels */}
          <div className="flex justify-between mt-3 text-[10px] text-text3">
            <span>12AM</span>
            <span>6AM</span>
            <span>12PM</span>
            <span>6PM</span>
            <span>Now</span>
          </div>
        </div>

        {/* Account Status */}
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
