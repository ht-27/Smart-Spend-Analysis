import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import InsightCards from "../components/InsightCards";
import SpendingCharts from "../components/SpendingCharts";
import HealthScore from "../components/HealthScore";
import BudgetForm from "../components/BudgetForm";
import BudgetProgress from "../components/BudgetProgress";

function Dashboard() {
    // Get User ID
    const user = JSON.parse(localStorage.getItem('smartspend-user') || '{}');
    const userId = user.sub || 'guest';

    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem(`smartspend-expenses-${userId}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem(`smartspend-budgets-${userId}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [filter, setFilter] = useState("All");

    // Reload data if user changes
    useEffect(() => {
        const saved = localStorage.getItem(`smartspend-expenses-${userId}`);
        const savedBudgets = localStorage.getItem(`smartspend-budgets-${userId}`);

        if (saved) setExpenses(JSON.parse(saved));
        else setExpenses([]);

        if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
        else setBudgets({});
    }, [userId]);

    // save to localStorage
    useEffect(() => {
        localStorage.setItem(
            `smartspend-expenses-${userId}`,
            JSON.stringify(expenses)
        );
    }, [expenses, userId]);

    // save budgets
    useEffect(() => {
        localStorage.setItem(`smartspend-budgets-${userId}`, JSON.stringify(budgets));
    }, [budgets, userId]);

    const removeBudget = (category) => {
        setBudgets((prev) => {
            const updated = { ...prev };
            delete updated[category];
            return updated;
        });
    };

    const [editingBudget, setEditingBudget] = useState(null);

    const editBudget = (budget) => {
        setEditingBudget(budget);
    };

    const [editingExpense, setEditingExpense] = useState(null);

    // add expense
    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    // update expense
    const updateExpense = (updatedExpense) => {
        setExpenses(
            expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
        );
        setEditingExpense(null);
    };

    // cancel edit
    const cancelEdit = () => {
        setEditingExpense(null);
    };

    // delete expense
    const deleteExpense = (id) => {
        setExpenses(expenses.filter((e) => e.id !== id));
    };
    const filteredExpenses =
        filter === "All"
            ? expenses
            : expenses.filter((e) => e.category === filter);

    const currentMonth = new Date().toISOString().slice(0, 7);

    const currentMonthTotal = expenses
        .filter((e) => e.date.startsWith(currentMonth))
        .reduce((sum, e) => sum + e.amount, 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans pb-12 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">

            {/* Optimized Dark Neon Background Blobs (CSS) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 bg-[#0F172A]/80 border-b border-white/5 sticky top-0 backdrop-blur-xl">
                <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12">
                    <div className="flex justify-between items-center h-24">
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-2.5 rounded-2xl shadow-lg shadow-cyan-500/20 cursor-pointer"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </motion.div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                                    SmartSpend
                                </h1>
                                <p className="text-xs text-gray-400 font-medium tracking-wide">PREMIUM DASHBOARD</p>
                            </div>
                        </div>

                        {/* Logout Button (Ideally this would log out, but just to show intent) */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/'}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
                        >
                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            LOGOUT
                        </motion.button>
                    </div>
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 mt-12 space-y-12"
            >

                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-5xl font-black text-white tracking-tight">Dashboard</h2>
                        <p className="text-xl text-gray-400 mt-2 font-medium">Financial Overview</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-lg">
                        <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider mr-3">Today:</span>
                        <span className="text-white font-mono font-bold text-lg">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </motion.div>

                {/* Top KPIs Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Current Month Spend KPI */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[2rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 .69 1.64 1.83 1.64 1.22 0 1.6-1.04 1.6-1.58 0-1.42-1.5-1.68-2.47-2.18-1.55-.8-2.5-2.09-2.5-3.6 0-1.8 1.3-3.17 2.84-3.51V3h2.67v1.92c1.22.25 2.19.93 2.67 2.39h-1.96c-.25-1.09-.99-1.58-1.75-1.58-1.09 0-1.54.91-1.54 1.54 0 1.41 1.5 1.69 2.52 2.23 1.6.86 2.45 2.05 2.45 3.59 .01 1.77-1.37 3.32-2.92 3.6z" /></svg>
                        </div>

                        <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-1 relative z-10">This Month's Spend</p>
                        <h2 className="text-6xl font-black text-white mt-4 tracking-tighter relative z-10">₹{currentMonthTotal.toLocaleString()}</h2>
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400 font-medium relative z-10">
                            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30">ACTIVE</span>
                            <span>budget tracking</span>
                        </div>
                    </motion.div>

                    {/* InsightCards will take up the rest */}
                    <div className="md:col-span-3 h-full">
                        <InsightCards expenses={expenses} />
                    </div>
                </motion.div>

                {/* Charts Section */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SpendingCharts expenses={expenses} />
                    </div>
                    <div className="lg:col-span-1">
                        <HealthScore expenses={expenses} />
                    </div>
                </motion.div>

                {/* Budget Section */}
                <motion.div variants={itemVariants} className="bg-[#1E293B]/60 backdrop-blur-md rounded-[2.5rem] border border-white/5 shadow-2xl p-10 relative overflow-hidden">
                    <div className="absolute flex flex-col justify-center items-center inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Monthly Budgets</h2>
                            <p className="text-lg text-gray-400 mt-1">Manage your category limits</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-full border border-white/10">
                            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <BudgetForm
                                categories={["Food", "Travel", "Rent", "Bills", "Shopping", "Other"]}
                                onSetBudget={(b) => {
                                    setBudgets(prev => ({ ...prev, [b.category]: b.limit }));
                                    setEditingBudget(null);
                                }}
                                editingBudget={editingBudget}
                            />
                        </div>
                        <div className="bg-[#0F172A]/50 p-8 rounded-3xl border border-white/5">
                            <BudgetProgress
                                budgets={budgets}
                                expenses={expenses}
                                onRemoveBudget={removeBudget}
                                onEditBudget={editBudget}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Expenses Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Form Side */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <div className="bg-[#1E293B]/60 backdrop-blur-md rounded-[2.5rem] border border-white/5 shadow-2xl p-8 sticky top-32">
                            <div className="mb-8 flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${editingExpense ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                    {editingExpense ? (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    ) : (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    {editingExpense ? "Edit Transaction" : "New Transaction"}
                                </h2>
                            </div>
                            <ExpenseForm
                                onAddExpense={addExpense}
                                editingExpense={editingExpense}
                                onUpdateExpense={updateExpense}
                                onCancelEdit={cancelEdit}
                            />
                        </div>
                    </motion.div>

                    {/* Table Side */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="bg-[#1E293B]/60 backdrop-blur-md rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden min-h-[600px]">
                            <div className="px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center bg-[#0F172A]/30 gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/10 text-white p-2 rounded-xl">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    {/* Filter */}
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="text-white bg-[#0F172A] border border-white/10 rounded-xl focus:ring-cyan-500 focus:border-cyan-500 py-3 pl-4 pr-10 shadow-lg font-medium w-full sm:w-auto text-sm"
                                    >
                                        <option value="All">All Categories</option>
                                        <option value="Food">Food</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Bills">Bills</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <button
                                        onClick={() => setExpenses([])}
                                        className="text-xs text-rose-400 hover:text-rose-300 font-bold px-6 py-3 rounded-xl hover:bg-rose-500/10 transition-colors uppercase tracking-widest border border-rose-500/20"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <ExpenseTable
                                expenses={filteredExpenses}
                                onDelete={deleteExpense}
                                onEdit={setEditingExpense}
                            />
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Footer */}
            <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 mt-20 border-t border-white/5 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-gray-500 text-sm font-medium">
                        © {new Date().getFullYear()} SmartSpend. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Created solely by <span className="text-cyan-400">Harsh Tiwari</span></span>

                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/ht-27"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                                title="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/harsh-tiwari-322446313/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                                title="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
