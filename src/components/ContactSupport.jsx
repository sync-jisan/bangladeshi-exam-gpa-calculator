import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail, HiChatAlt2, HiQuestionMarkCircle, HiCheck } from 'react-icons/hi';

const ContactSupport = () => {
    const [formState, setFormState] = useState('idle'); // idle, sending, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('sending');
        // Simulated API call
        setTimeout(() => setFormState('success'), 1500);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] relative overflow-hidden font-['Plus_Jakarta_Sans']">
            {/* Professional Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#006a4e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div>
                            <span className="text-[#006a4e] font-black text-sm tracking-[0.2em] uppercase mb-4 block">Get In Touch</span>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                                How Can We <br /><span className="text-[#006a4e]">Help You?</span>
                            </h1>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
                                Have a question about your GPA calculation? Need to report a bug? We're here to assist you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: <HiMail />, title: "Email Us", detail: "support@bgc-calculator.id", color: "bg-[#006a4e]" },
                                { icon: <HiChatAlt2 />, title: "Live Support", detail: "Available 24/7 via BGC Agent", color: "bg-[#f42a41]" },
                                { icon: <HiQuestionMarkCircle />, title: "Legal Inquiries", detail: "legal@bgc-calculator.id", color: "bg-slate-800" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 group">
                                    <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium">{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
                    >
                        <AnimatePresence mode="wait">
                            {formState !== 'success' ? (
                                <motion.form
                                    key="contact-form"
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input required type="text" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-[#006a4e]/20 transition-all font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input required type="email" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-[#006a4e]/20 transition-all font-bold" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                                        <select className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-[#006a4e]/20 transition-all font-bold appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Bug Report</option>
                                            <option>Feature Request</option>
                                            <option>AI Feedback</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea required rows="4" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-[#006a4e]/20 transition-all font-bold resize-none"></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formState === 'sending'}
                                        className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-[#006a4e] transition-all disabled:opacity-50"
                                    >
                                        {formState === 'sending' ? 'Sending Message...' : 'Send Message Now'}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success-msg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-24 h-24 bg-[#f0fdf4] text-[#006a4e] rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner ring-8 ring-[#f0fdf4]">
                                        <HiCheck />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h2>
                                    <p className="text-slate-500 font-medium mb-8">Thank you for traveling with us. We'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="px-8 py-3 bg-[#006a4e] text-white font-bold rounded-xl"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;
