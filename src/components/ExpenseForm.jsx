import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || "");
      setAmount(editingExpense.amount);
      setDate(editingExpense.date);
      setCategory(editingExpense.category);
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("Food");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return;

    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        title,
        amount: parseFloat(amount),
        date,
        category,
      });
    } else {
      onAddExpense({
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        date,
        category,
      });
    }

    // Reset
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Description (Optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#0F172A] text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-white/20 transition-colors placeholder-gray-600"
          placeholder="e.g. Grocery Shopping"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Amount */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0F172A] text-white border border-white/10 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-white/20 transition-colors font-mono"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#0F172A] text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-white/20 transition-colors cursor-pointer"
            required
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Category</label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0F172A] text-white border border-white/10 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-white/20 transition-colors cursor-pointer"
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Rent">Rent</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: editingExpense ? "#F59E0B" : "#06B6D4" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full py-4 px-6 rounded-xl text-black font-black uppercase tracking-widest shadow-lg transition-all ${editingExpense
              ? "bg-amber-400 shadow-amber-500/20"
              : "bg-cyan-400 shadow-cyan-500/20"
            }`}
        >
          {editingExpense ? "Update Transaction" : "Add Transaction"}
        </motion.button>

        {editingExpense && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancelEdit}
            type="button"
            className="px-4 rounded-xl border-2 border-white/10 text-gray-400 hover:text-white hover:border-white/30 font-bold"
          >
            X
          </motion.button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;
