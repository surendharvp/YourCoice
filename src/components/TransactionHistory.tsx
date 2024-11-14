import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { RootState } from '../redux/store';

const TransactionHistory: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.transactions.list);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Skill</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    <span className={`flex items-center ${transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'earned' ? <ArrowUpRight className="mr-1" /> : <ArrowDownLeft className="mr-1" />}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-2">{transaction.amount} hours</td>
                  <td className="p-2">{transaction.skill}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;