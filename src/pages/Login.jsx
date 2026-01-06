import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function Login() {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Login Success:", decoded);
        localStorage.setItem('smartspend-user', JSON.stringify(decoded));
        navigate('/dashboard');
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden">

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/landing_bg.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Darker overlay for better text readability on login */}
                <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-[4px]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-transparent to-purple-900/40"></div>
            </div>

            {/* Floating Orbs for extra depth */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{ y: [0, 60, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="bg-[#1E293B]/40 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full text-center relative z-10 group hover:border-white/20 transition-all duration-500"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] pointer-events-none"></div>

                <div className="flex justify-center mb-10 relative">
                    <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-cyan-400 to-blue-600 p-5 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)] relative z-10"
                    >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </motion.div>
                </div>

                <h1 className="text-5xl font-black text-white mb-3 tracking-tight drop-shadow-lg">Welcome</h1>
                <p className="text-gray-300 text-sm mb-12 font-medium tracking-wide">Sign in to continue</p>

                <div className="space-y-6 flex flex-col items-center w-full relative z-10">
                    <div className="w-full flex justify-center">
                        <div className="transform transition-transform hover:scale-105 duration-200">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                theme="filled_black"
                                shape="pill"
                                size="large"
                                width="100%"
                                text="continue_with"
                                logo_alignment="center"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 mx-4">
                    <p className="text-gray-400 text-xs font-medium">
                        Protected by industry standard encryption.
                    </p>
                </div>

            </motion.div>
        </div>
    );
}

export default Login;
