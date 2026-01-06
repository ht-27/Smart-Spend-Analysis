import { motion } from "framer-motion";

function BudgetProgress({ budgets, expenses, onRemoveBudget, onEditBudget }) {
    const budgetCategories = Object.keys(budgets);

    if (budgetCategories.length === 0) {
        return <p className="text-gray-500 text-sm italic text-center py-4">No budgets set. Add one to start tracking!</p>;
    }

    return (
        <div className="space-y-8">
            {budgetCategories.map((category, index) => {
                const limit = budgets[category];
                const spent = expenses
                    .filter((e) => e.category === category)
                    .reduce((sum, e) => sum + e.amount, 0);

                const progress = Math.min((spent / limit) * 100, 100);
                let color = "bg-emerald-400";
                if (progress > 80) color = "bg-amber-400";
                if (progress >= 100) color = "bg-rose-500";

                return (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-white text-lg">{category}</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-mono font-medium ${progress >= 100 ? 'text-rose-400' : 'text-gray-400'}`}>
                                    <span className="text-white">₹{spent}</span> / ₹{limit}
                                </span>

                                {/* Action Buttons (visible on hover) */}
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onRemoveBudget(category)}
                                        className="text-gray-500 hover:text-rose-400 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-[#0F172A] rounded-full h-3 overflow-hidden shadow-inner border border-white/5">
                            <motion.div
                                className={`h-3 rounded-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default BudgetProgress;
