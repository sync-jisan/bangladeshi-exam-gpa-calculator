import { motion } from 'framer-motion';
import { HiShieldCheck, HiOutlineDocumentText, HiOutlineLockClosed, HiOutlineEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden font-['Plus_Jakarta_Sans']">
            {/* Brand Glow Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#006a4e]/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#f42a41]/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-[#006a4e] text-xs font-bold uppercase tracking-widest mb-6">
                        <HiShieldCheck className="w-4 h-4" />
                        Trust & Security
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        Privacy <span className="text-[#006a4e]">Policy</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Last Updated: January 2026</p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-slate max-w-none space-y-12"
                >
                    <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800 mb-4 mt-0">
                            <HiOutlineDocumentText className="text-[#006a4e]" />
                            1. Introduction
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Welcome to the Bangladeshi GPA Calculator (BGC). We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform, including our GPA calculation tools and BGC Agent AI.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
                            <HiOutlineLockClosed className="text-[#f42a41]" />
                            2. Information We Collect
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-[#006a4e] mb-2 text-lg">Personal Data</h3>
                                <p className="text-sm text-slate-600">We do not require user accounts or registration. We only collect information you voluntarily provide through support inquiries or newsletter subscriptions (e.g., email address).</p>
                            </div>
                            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-[#006a4e] mb-2 text-lg">Calculator Data</h3>
                                <p className="text-sm text-slate-600">Marks and subjects entered into the calculators are stored locally on your device (Local Storage) and are not transmitted to our servers unless specifically requested for report sharing.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
                            <HiOutlineEye className="text-amber-500" />
                            3. AI Analysis (BGC Agent)
                        </h2>
                        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                            <p className="leading-relaxed opacity-90">
                                Our **BGC Agent AI** uses industry-standard encryption to process your queries. Chat history with the agent is stored locally to maintain context. We do not use your academic data for training external models or sell identifying information to third parties.
                            </p>
                        </div>
                    </section>

                    <section className="border-t border-slate-100 pt-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Third-Party Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our website contains links to official government education portals (e.g., Education Board Results). We are not responsible for the privacy practices or content of these external sites. We encourage you to read their privacy policies upon visiting.
                        </p>
                    </section>

                    <section className="text-center bg-[#f42a41]/5 p-8 rounded-3xl border border-[#f42a41]/10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-0">Questions?</h2>
                        <p className="text-slate-600 mb-6">If you have any questions about this Privacy Policy, please contact us.</p>
                        <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-[#006a4e] text-white font-bold rounded-xl shadow-lg hover:shadow-[#006a4e]/20 transition-all">
                            Contact Support
                        </Link>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
