import { motion } from "framer-motion";

function InsightCards({ expenses }) {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b, "N/A"
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 h-full">

      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group border border-white/10"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl"></div>

        <p className="text-sm font-bold text-indigo-200 uppercase tracking-widest relative z-10 mb-2">Lifetime Spend</p>
        <h2 className="text-5xl font-black text-white mt-1 relative z-10 tracking-tight">₹{totalSpent.toLocaleString()}</h2>

        {/* Decorative Wave/Line could go here */}
        <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
      </motion.div>

      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group border border-white/10"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-300/30 rounded-full blur-3xl"></div>

        <p className="text-sm font-bold text-cyan-100 uppercase tracking-widest relative z-10 mb-2">Top Category</p>
        <h2 className="text-5xl font-black text-white mt-1 relative z-10 tracking-tight">{topCategory}</h2>
        <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full"></div>
      </motion.div>

      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group border border-white/10"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>

        <p className="text-sm font-bold text-rose-100 uppercase tracking-widest relative z-10 mb-2">Total Entries</p>
        <h2 className="text-5xl font-black text-white mt-1 relative z-10 tracking-tight">{expenses.length}</h2>
        <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
      </motion.div>

    </div>
  );
}

export default InsightCards;
