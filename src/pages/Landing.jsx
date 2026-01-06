import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="min-h-screen w-full bg-[#0F172A] text-white font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden flex flex-col">

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/landing_bg.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Navbar (Logo Only) */}
            <nav className="relative z-20 max-w-7xl mx-auto px-6 h-24 flex items-center w-full">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight filter drop-shadow-lg">SmartSpend</span>
                </div>
            </nav>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 -mt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="px-5 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/20 text-cyan-300 text-sm font-bold uppercase tracking-[0.2em] mb-8 inline-block backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                        Next Gen Finance
                    </motion.span>

                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none mb-8 drop-shadow-2xl">
                        <motion.span
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="block text-white"
                        >
                            MASTER
                        </motion.span>
                        <motion.span
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse"
                        >
                            YOUR WEALTH
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-16 leading-relaxed font-light drop-shadow-md"
                    >
                        Visualize expenses. Crush budgets. Build your future. <br />
                        All in one stunning, realtime dashboard.
                    </motion.p>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/login"
                            className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all overflow-hidden"
                        >
                            <span className="relative z-10">GET STARTED</span>
                            <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                    </motion.div>
                </motion.div>
            </main>

            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_cyan]"
                />
                <motion.div
                    animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 right-20 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_20px_purple]"
                />
                <motion.div
                    animate={{ x: [0, 50, 0], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-1/3 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                />
            </div>
        </div>
    );
}

export default Landing;
