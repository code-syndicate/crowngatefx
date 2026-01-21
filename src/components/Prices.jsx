import Balances from "./Balances";

function Prices({ auth }) {
  const account = auth.user.account;
  return <Balances account={account} />;
}

export default Prices;
