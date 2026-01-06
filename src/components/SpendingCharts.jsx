import { useState } from 'react';
import { motion } from "framer-motion";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from 'recharts';

const COLORS = ['#6366F1', '#06B6D4', '#F43F5E', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'];

// Custom Tooltip for Dark Mode
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0F172A] border border-white/10 p-4 rounded-xl shadow-xl">
                <p className="text-gray-400 text-xs mb-1 font-bold">{label ? label : payload[0].name}</p>
                <p className="text-2xl font-bold text-white">₹{payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

export default function SpendingCharts({ expenses }) {
    const [chartType, setChartType] = useState('pie');

    // 1. Category Data (for Pie & Bar)
    const categoryData = expenses.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += curr.amount;
        } else {
            acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
    }, []).filter(d => d.value > 0);

    // 2. Time Data (for Line)
    const timeData = expenses
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .reduce((acc, curr) => {
            const date = curr.date;
            const existing = acc.find(item => item.date === date);
            if (existing) {
                existing.amount += curr.amount;
            } else {
                acc.push({ date, amount: curr.amount });
            }
            return acc;
        }, []);

    if (expenses.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#1E293B]/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 shadow-2xl text-center text-gray-500 py-16 h-full flex items-center justify-center"
            >
                <div>
                    <svg className="w-16 h-16 mx-auto mb-4 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    <p className="text-xl font-medium text-gray-400">Add expenses to unlock analytics</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1E293B]/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl h-full flex flex-col"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-bold text-white">Visual Analytics</h2>
                    <p className="text-base text-gray-400 mt-1">Spending trends & breakdown</p>
                </div>

                <div className="flex bg-[#0F172A]/80 rounded-xl p-1.5 shadow-inner mt-4 sm:mt-0 border border-white/5">
                    {['pie', 'bar', 'line'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setChartType(type)}
                            className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all relative ${chartType === type
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {chartType === type && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg rounded-lg"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{type}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow w-full min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'pie' && (
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={140}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff' }} iconType="circle" />
                        </PieChart>
                    )}

                    {chartType === 'bar' && (
                        <BarChart data={categoryData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                            <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    )}

                    {chartType === 'line' && (
                        <LineChart data={timeData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#06B6D4" // Cyan
                                strokeWidth={4}
                                dot={{ r: 6, fill: '#06B6D4', strokeWidth: 0 }}
                                activeDot={{ r: 10, fill: '#fff' }}
                            />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
