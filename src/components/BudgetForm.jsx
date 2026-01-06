import { useState } from "react";
import { motion } from "framer-motion";

function BudgetForm({ categories, onSetBudget, editingBudget }) {
    const [category, setCategory] = useState(categories[0]);
    const [limit, setLimit] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!limit) return;
        onSetBudget({ category, limit: parseFloat(limit) });
        setLimit("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-end gap-6 bg-[#0F172A] p-6 rounded-2xl border border-white/10 border-dashed"
        >
            <div className="w-full sm:w-auto flex-grow">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Category</label>
                <div className="relative">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#1E293B] text-white border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-auto flex-grow">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Limit (₹)</label>
                <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full bg-[#1E293B] text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-600 font-mono"
                    placeholder="e.g. 5000"
                    required
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full sm:w-auto bg-purple-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition-colors uppercase tracking-wider text-sm"
            >
                Set Budget
            </motion.button>
        </form>
    );
}

export default BudgetForm;
