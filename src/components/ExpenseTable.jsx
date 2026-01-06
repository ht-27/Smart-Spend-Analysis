import { motion, AnimatePresence } from "framer-motion";

function ExpenseTable({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-[#0F172A]/50 text-gray-400">
            <th className="py-5 px-6 font-bold uppercase tracking-wider text-xs">Title</th>
            <th className="py-5 px-6 font-bold uppercase tracking-wider text-xs">Amount</th>
            <th className="py-5 px-6 font-bold uppercase tracking-wider text-xs">Category</th>
            <th className="py-5 px-6 font-bold uppercase tracking-wider text-xs">Date</th>
            <th className="py-5 px-6 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {expenses.map((expense, index) => (
              <motion.tr
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
              >
                <td className="py-5 px-6 text-white font-medium">
                  {expense.title || <span className="text-gray-600 italic">No Title</span>}
                </td>
                <td className="py-5 px-6 font-mono text-cyan-400 font-bold text-lg">
                  ₹{expense.amount.toLocaleString()}
                </td>
                <td className="py-5 px-6">
                  <span className="bg-[#0F172A] border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {expense.category}
                  </span>
                </td>
                <td className="py-5 px-6 text-gray-400 text-sm">
                  {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(expense)}
                      className="text-indigo-400 hover:text-indigo-300 bg-[#0F172A] p-2 rounded-lg border border-white/10"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(expense.id)}
                      className="text-rose-400 hover:text-rose-300 bg-[#0F172A] p-2 rounded-lg border border-white/10"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
