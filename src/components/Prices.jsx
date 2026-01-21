import Balances from "./Balances";

function Prices({ auth }) {
  const account = auth.user.account;
  return (
    <div className="min-h-screen">
      {/* Mobile App-like Header */}
      <div className="lg:hidden bg-surface/50 backdrop-blur-xl sticky top-0 z-40 px-5 py-4 border-b border-white/5">
        <p className="text-text2 text-xs uppercase tracking-widest font-bold">
          Exchange
        </p>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Market & Mining
        </h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block px-8 pt-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Market & Mining
        </h1>
        <p className="text-text2 mt-1">
          Monitor live prices and manage your mining operations.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        <Balances account={account} />
      </div>
    </div>
  );
}

export default Prices;
