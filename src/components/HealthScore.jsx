import { motion } from "framer-motion";
import { calculateHealth } from "../utils/insights";

function HealthScore({ expenses }) {
  const score = calculateHealth(expenses);

  let color = "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]";
  let message = "Excellent! Spending is under control.";
  let barColor = "bg-emerald-400";
  let bgGlow = "bg-emerald-500/10";
  let msgColor = "text-emerald-300";

  if (score < 80) {
    color = "text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]";
    message = "Moderate. Watch your major categories.";
    barColor = "bg-amber-400";
    bgGlow = "bg-amber-500/10";
    msgColor = "text-amber-300";
  }

  if (score < 50) {
    color = "text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]";
    message = "⚠️ Warning! High spending detected.";
    barColor = "bg-rose-500";
    bgGlow = "bg-rose-500/10";
    msgColor = "text-rose-300";
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#1E293B]/60 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10 shadow-2xl text-center relative overflow-hidden group h-full flex flex-col justify-center"
    >
      <div className={`absolute inset-0 ${bgGlow} filter blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`}></div>

      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 relative z-10">Financial Health</p>

      <div className="relative z-10 mb-8">
        <h2 className={`text-8xl font-black ${color} tracking-tighter`}>
          {score}
        </h2>

        <p className={`mt-4 font-bold text-lg ${msgColor}`}>
          {message}
        </p>
      </div>

      <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden relative z-10">
        <motion.div
          className={`h-full rounded-full ${barColor} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

    </motion.div>
  );
}

export default HealthScore;
