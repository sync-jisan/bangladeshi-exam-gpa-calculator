import { motion } from 'framer-motion';
import { HiOutlineScale, HiOutlineCheckCircle, HiOutlineExclamation, HiOutlineLightBulb } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden font-['Plus_Jakarta_Sans']">
            {/* Brand Glow Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#f42a41]/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#006a4e]/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                        <HiOutlineScale className="w-4 h-4" />
                        Usage Agreement
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        Terms of <span className="text-[#f42a41]">Service</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Effective Date: January 01, 2026</p>
                </motion.div>

                {/* Content Cards */}
                <div className="space-y-8">
                    {/* Disclaimer Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="bg-[#006a4e] p-8 rounded-3xl text-white shadow-xl shadow-[#006a4e]/10">
                            <HiOutlineExclamation className="text-4xl mb-4 text-[#fcd34d]" />
                            <h2 className="text-xl font-bold mb-3">Mathematical Accuracy</h2>
                            <p className="text-emerald-50 opacity-90 text-sm leading-relaxed">
                                While we strive for 100% precision in accordance with NCTB guidelines, BGC results are for estimation purposes only. Always verify your final GPA with official boards.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-900/10">
                            <HiOutlineCheckCircle className="text-4xl mb-4 text-[#4ade80]" />
                            <h2 className="text-xl font-bold mb-3">Acceptable Use</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                You agree to use this platform for personal academic purposes. Automated scraping, data mining, or malicious attempts to disrupt the AI are strictly prohibited.
                            </p>
                        </div>
                    </motion.div>

                    {/* Detailed Clauses */}
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-10">
                        <section>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#006a4e] rounded-full"></span>
                                1. Acceptance of Terms
                            </h3>
                            <p className="text-slate-600">
                                By accessing the Bangladeshi GPA Calculator (BGC) website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please refrain from using our services.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#f42a41] rounded-full"></span>
                                2. AI Advice Disclaimer
                            </h3>
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl">
                                <div className="flex gap-4">
                                    <HiOutlineLightBulb className="text-amber-500 text-2xl shrink-0" />
                                    <p className="text-sm text-amber-800 leading-relaxed italic">
                                        "The BGC Agent AI provides guidance based on historical patterns and general educational trends. It does NOT constitute official admission decisions. Always refer to university website circulars for final eligibility."
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#006a4e] rounded-full"></span>
                                3. Intellectual Property
                            </h3>
                            <p className="text-slate-600">
                                All logos, calculator logic, and AI interfaces are the property of BGC. You may print and download generated grade sheets for personal use, but commercial redistribution of our proprietary software is prohibited.
                            </p>
                        </section>
                    </div>

                    {/* Footer Nav */}
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm mb-6">Need more clarification?</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/privacy" className="px-6 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/contact" className="px-6 py-2 bg-[#f42a41] text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transition-colors">
                                Support Center
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
