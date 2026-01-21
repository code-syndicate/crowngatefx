import Balances from "./Balances";

function Prices({ auth }) {
  const account = auth.user.account;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Market & Mining
        </h1>
        <p className="text-text2">
          Monitor live prices and manage your mining operations.
        </p>
      </div>

      <div className="space-y-8">
        {/* Balances Cards  */}
        <Balances account={account} />
      </div>
    </div>
  );
}

export default Prices;
