import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiSparkles, HiDeviceMobile, HiPencilAlt, HiSearch, HiCheckCircle, HiDownload, HiUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';
import BlurText from './BlurText';
import Footer from './Footer';
import Newsletter from './Newsletter';
import InfoArticles from './InfoArticles';
import ChatBot from './ChatBot';

const HomePage = ({ language, t }) => {
    const exams = [
        {
            id: 'jsc',
            name: 'JSC',
            fullName: language === 'bn' ? 'জুনিয়র স্কুল সার্টিফিকেট' : 'Junior School Certificate',
            desc: language === 'bn' ? 'অষ্টম শ্রেণীর ফলাফল।' : 'Grade 8 comprehensive results.',
            path: '/jsc-gpa-calculator',
            color: '#006a4e',
            icon: <HiPencilAlt className="w-5 h-5" />
        },
        {
            id: 'ssc',
            name: 'SSC',
            fullName: language === 'bn' ? 'মাধ্যমিক স্কুল সার্টিফিকেট' : 'Secondary School Certificate',
            desc: language === 'bn' ? 'দশম শ্রেণীর ফলাফল ও বিশ্লেষণ।' : 'Grade 10 results and analysis.',
            path: '/ssc-gpa-calculator',
            color: '#f42a41',
            icon: <HiSparkles className="w-5 h-5" />
        },
        {
            id: 'hsc',
            name: 'HSC',
            fullName: language === 'bn' ? 'উচ্চ মাধ্যমিক সার্টিফিকেট' : 'Higher Secondary Certificate',
            desc: language === 'bn' ? 'কলেজের ফলাফল ও অ্যাডমিশন।' : 'College results and eligibility.',
            path: '/hsc-gpa-calculator',
            color: '#1e293b',
            icon: <HiDeviceMobile className="w-5 h-5" />
        }
    ];

    const stats = [
        { label: language === 'bn' ? 'ব্যবহৃত হয়েছে' : 'Results Calculated', value: '1M+', icon: <HiCheckCircle className="text-[#006a4e]" /> },
        { label: language === 'bn' ? 'বোর্ড অনুমোদিত' : 'Board Standards', value: 'Official', icon: <HiShieldCheck className="text-blue-500" /> },
        { label: language === 'bn' ? 'সক্রিয় ছাত্র-ছাত্রী' : 'Active Students', value: '50k+', icon: <HiUserGroup className="text-amber-500" /> }
    ];

    const heroHeadline = language === 'bn' ? [
        { text: 'আপনার' },
        { text: 'ভবিষ্যৎ', className: 'text-[#006a4e]' },
        { text: 'নির্ধারণ করুন' },
        { text: 'নির্ভুলভাবে', className: 'text-[#f42a41]', hasPenSign: true }
    ] : [
        { text: 'Calculate' },
        { text: 'Success', className: 'text-[#006a4e]' },
        { text: 'With Absolute' },
        { text: 'Precision.', className: 'text-slate-800', hasPenSign: true }
    ];

    return (
        <div className="flex flex-col gap-12 md:gap-24 overflow-hidden -mt-4 font-['Plus_Jakarta_Sans']">

            {/* Industry Level Hero Section */}
            <section className="relative pt-12 md:pt-20 pb-16 px-4">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 pointer-events-none opacity-40">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#006a4e]/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f42a41]/10 blur-[100px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                        <span className="flex items-center gap-1.5 text-[#006a4e]">
                            <HiShieldCheck className="w-4 h-4" />
                            Official Education Board Grading System 2024
                        </span>
                    </div>

                    {/* Main Headline */}
                    <BlurText
                        text={heroHeadline}
                        delay={80}
                        animateBy="words"
                        direction="top"
                        className="text-5xl md:text-[6.5rem] font-bold text-slate-900 tracking-tight leading-[1.05] mb-8 text-center justify-center max-w-6xl"
                    />

                    {/* Subtext */}
                    <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto mb-12 text-center font-medium leading-relaxed opacity-90">
                        {language === 'bn'
                            ? 'বাংলাদেশের ১ নম্বর রেজাল্ট এনালাইসিস প্ল্যাটফর্ম। জিপিএ গণনা থেকে শুরু করে অ্যাডমিশন গাইডলাইন - সবই এক জায়গায়।'
                            : "The most trusted result analysis platform in Bangladesh. Accurate GPA calculation, PDF reports, and advanced admission tracking."}
                    </p>

                    {/* Quick Feature Chips */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {[
                            { label: language === 'bn' ? 'এআই চালিত' : 'AI Powered', icon: <HiSparkles /> },
                            { label: language === 'bn' ? 'পিডিএফ রিপোর্ট' : 'PDF Reports', icon: <HiDownload /> },
                            { label: language === 'bn' ? 'অ্যাডমিশন ট্র্যাকার' : 'Admission Tracker', icon: <HiSearch /> }
                        ].map((chip, i) => (
                            <div key={i} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-[#006a4e]">{chip.icon}</span>
                                {chip.label}
                            </div>
                        ))}
                    </div>

                    {/* Industry Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-y border-slate-100 py-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center group">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{stat.icon}</span>
                                    <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exam Selector Section - Redesigned to look more "Enterprise" */}
            <section className="px-4 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-black text-[#006a4e] uppercase tracking-[0.3em] mb-4">Exam Selection</h2>
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">Choose your academic platform to begin</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {exams.map((exam) => (
                        <div
                            key={exam.id}
                            className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-[#006a4e]/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full"
                        >
                            {/* Animated Background Accent */}
                            <div
                                className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] group-hover:scale-150 transition-transform duration-700 rounded-full -mr-16 -mt-16"
                                style={{ backgroundColor: exam.color }}
                            ></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div
                                    className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white mb-8 shadow-xl transition-transform group-hover:rotate-6 duration-300"
                                    style={{ backgroundColor: exam.color }}
                                >
                                    {exam.icon}
                                </div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 font-['Space_Grotesk']">{exam.name} Education</h3>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">{exam.fullName}</h2>
                                <p className="text-slate-500 text-base font-medium mb-10 leading-relaxed opacity-80">{exam.desc}</p>

                                <Link
                                    to={exam.path}
                                    className="mt-auto inline-flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 group-hover:bg-[#006a4e] transition-colors duration-300 overflow-hidden"
                                >
                                    <span className="font-bold text-sm text-slate-900 group-hover:text-white transition-colors">Launch Calculator</span>
                                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#006a4e] group-hover:translate-x-1 transition-transform">
                                        <HiArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature Highlights Section - More Compact but Powerful */}
            {/* Feature Highlights Section - Redesigned to Light Modern Theme */}
            <section className="bg-white py-24 px-4 overflow-hidden relative">
                {/* Subtle Brand Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#006a4e]/5 blur-[120px] rounded-full pointer-events-none -mr-64 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f42a41]/5 blur-[100px] rounded-full pointer-events-none -ml-48 -mb-32"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-[#006a4e] font-black uppercase tracking-[0.3em] text-xs mb-6">Why Students Choose Us</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tighter leading-tight">
                            Smart Analysis. <br />
                            <span className="text-[#006a4e]">Zero Errors.</span>
                        </h3>
                        <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
                            We combine advanced board-specific algorithms with a modern interface to give you the most reliable academic results tracking platform in the country.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: '100% Data Privacy', desc: 'Your marks are never stored on our servers.', color: '#006a4e' },
                                { title: 'Instantly Export Results', desc: 'Download professional grade sheets in PDF.', color: '#f42a41' },
                                { title: 'University Eligibility', desc: 'Predict which top universities you qualify for.', color: '#006a4e' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors border border-slate-100 group-hover:border-[#006a4e]/20 group-hover:bg-[#f0fdf4]"
                                        style={{ color: item.color }}>
                                        <HiCheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 group-hover:text-[#006a4e] transition-colors">{item.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-slate-50 p-1 rounded-[3.5rem] shadow-2xl shadow-slate-100 relative z-10 border border-slate-100">
                            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-white shadow-inner">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-100"></div>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <div className="h-6 bg-slate-50 rounded-full w-3/4"></div>
                                    <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                                    <div className="grid grid-cols-3 gap-4 mt-8">
                                        <div className="h-20 bg-[#f0fdf4] rounded-2xl border border-[#006a4e]/10"></div>
                                        <div className="h-20 bg-slate-50 rounded-2xl"></div>
                                        <div className="h-20 bg-slate-50 rounded-2xl"></div>
                                    </div>
                                </div>

                                <div className="h-14 bg-[#006a4e] rounded-2xl w-full flex items-center justify-center text-white font-bold shadow-lg shadow-[#006a4e]/20">
                                    Generate PDF Report
                                </div>
                            </div>
                        </div>
                        {/* Floating elements for "industry" feel */}
                        <div className="absolute -top-6 -right-6 bg-white p-5 rounded-3xl shadow-xl z-20 hidden md:block border border-slate-50 animate-bounce duration-[3000ms]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                                    <HiSparkles className="text-amber-500 w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-slate-900 text-sm">GPA 5.00</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prediction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BGC AGENT Spotlight Section - Industry Level AI Feature */}
            <section className="px-4 max-w-7xl mx-auto w-full py-12 md:py-24">
                <div className="bg-[#f0fdf4] rounded-[3rem] p-8 md:p-16 border border-[#bbf7d0] relative overflow-hidden">
                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#16a34a]/10 blur-[80px] rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-110"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#bbf7d0] text-[#006a4e] text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                                <HiSparkles className="animate-pulse" />
                                AI Powered Assistant
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                Meet <span className="text-[#006a4e]">BGC AGENT</span>. <br />
                                Your 24/7 Board Expert.
                            </h2>
                            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium opacity-90">
                                {language === 'bn'
                                    ? 'আপনার জিপিএ গণনা থেকে শুরু করে অ্যাডমিশন সংক্রান্ত যেকোনো জটিল প্রশ্নের তাৎক্ষণিক সমাধান দিতে তৈরি আমাদের অ্যাডভান্সড এআই এজেন্ট।'
                                    : 'From GPA calculations to complex admission queries, our advanced AI agent is trained to provide instant, official-grade academic guidance.'}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                {[
                                    { title: language === 'bn' ? 'তাৎক্ষণিক উত্তর' : 'Instant Answers', desc: language === 'bn' ? 'বোর্ড গ্রেডিং সংক্রান্ত সকল প্রশ্ন।' : 'Queries about board grading rules.' },
                                    { title: language === 'bn' ? 'স্মার্ট গাইডেন্স' : 'Smart Guidance', desc: language === 'bn' ? 'ভার্সিটি এলিজিবিলিটি এনালাইসিস।' : 'University eligibility analysis.' },
                                    { title: language === 'bn' ? 'বোর্ড এক্সপার্ট' : 'Board Expert', desc: language === 'bn' ? 'JSC, SSC & HSC স্পেশালিস্ট।' : 'Specialist in JSC, SSC & HSC.' },
                                    { title: language === 'bn' ? 'সর্বদা সক্রিয়' : 'Always Active', desc: language === 'bn' ? '২৪ ঘণ্টা আপনার সহায়তায় নিয়োজিত।' : 'Working 24/7 at your service.' }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-3">
                                        <HiCheckCircle className="text-[#006a4e] w-6 h-6 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">{feature.title}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/bgc-agent-ai" className="flex items-center gap-2 px-8 py-4 bg-[#006a4e] text-white rounded-2xl font-bold hover:bg-[#004d39] transition-all shadow-xl shadow-[#006a4e]/20 group">
                                {language === 'bn' ? 'BGC এজেন্টের সাথে কথা বলুন' : 'Chat with BGC AGENT'}
                                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="relative flex justify-center lg:justify-end">
                            {/* Visual Asset for the AI Agent */}
                            <div className="relative w-full max-w-[400px] aspect-square bg-white rounded-[2.5rem] shadow-2xl border border-white p-8 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-transparent opacity-50"></div>
                                <div className="relative h-full flex flex-col justify-center items-center text-center">
                                    <div className="w-24 h-24 bg-[#006a4e] rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                                        <HiSparkles className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">BGC AGENT v1.0</h3>
                                    <p className="text-xs font-bold text-[#006a4e] uppercase tracking-[0.2em] mb-6">Online & Ready</p>

                                    <div className="space-y-3 w-full">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3 text-left">
                                            <div className="w-2 h-2 rounded-full bg-[#006a4e]"></div>
                                            <div className="flex-1 h-3 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3 text-left">
                                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                            <div className="flex-1 h-3 bg-slate-100 rounded-full w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Accent */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-50 hidden md:block group-hover:-translate-y-2 transition-transform">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-xl">
                                        <HiShieldCheck className="text-blue-500 w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900 text-sm">Verified Agent</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <InfoArticles t={t} />
            <Newsletter t={t} />
            <Footer t={t} />
        </div>
    );
};

export default HomePage;
