import BitcoinImage from "../assets/crypto/bitcoin.png";
import { FcEmptyTrash } from "react-icons/fc";

// Sample transaction data
const transactions = [
  {
    sn: 1,
    assetIcon: "https://example.com/bitcoin-icon.png",
    date: "2023-09-09",
    id: 12345,
    amount: "1000 BTC",
    status: "Completed",
    receiver: "John Doe",
    type: "Buy",
  },
];

function TransactionTable({ user }) {
  return (
    <div className="w-full  pt-8 lg:pt-8  mt-8 flex flex-col justify-center items-start rounded overflow-auto  max-h-[500px]">
      {!(user.history && user.history?.length > 0) && (
        <div className="flex flex-col justify-center items-center py-16 w-full bg-bg3">
          <p className="text-center text-white/80 text-lg py-6">
            {" "}
            No history yet
            <br />
          </p>
          <FcEmptyTrash className="text-4xl" />
        </div>
      )}

      {user.history && user.history?.length > 0 && (
        <div className="w-full overflow-hidden card-nebula">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-text2 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="py-4 px-6">S/N</th>
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {user.history.map((transaction, i) => (
                <tr
                  key={transaction.sn || i}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="py-4 px-6 text-text2 font-mono text-sm">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-white font-mono text-sm">
                    {transaction._id}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-bold uppercase",
                        transaction.txType === "credit"
                          ? "bg-success/20 text-success"
                          : "bg-danger/20 text-danger",
                      )}
                    >
                      {transaction.txType}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white font-bold">
                    ${transaction.amount}
                  </td>
                  <td className="py-4 px-6 text-text2 text-sm">
                    {transaction.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
