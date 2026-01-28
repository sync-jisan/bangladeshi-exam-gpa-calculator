import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiClock, HiBookOpen, HiAnnotation, HiTrendingUp, HiChevronDown, HiShieldCheck } from 'react-icons/hi';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="group border border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-[#006a4e]/20 transition-all duration-300 shadow-sm hover:shadow-md">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
            >
                <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-[#006a4e]' : 'text-slate-800'}`}>
                    {question}
                </span>
                <span className={`transform transition-all duration-300 flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#f0fdf4] ${isOpen ? 'rotate-180 bg-[#f0fdf4] text-[#006a4e]' : 'text-slate-400'}`}>
                    <HiChevronDown size={20} />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-50 pt-4 font-medium text-sm md:text-base">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InfoArticles = ({ t }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const articles = [
        {
            id: 1,
            title: t ? t('article_1_title') : 'How GPA Calculation Works',
            p1: t ? t('article_1_p1') : 'In the Bangladeshi education system (SSC/HSC), your Grade Point Average (GPA) is calculated based on the average Grade Points (GP) obtained in all your main subjects. However, the calculation has a unique feature known as the 4th Subject Benefit.',
            p2: t ? t('article_1_p2') : 'Your 4th subject (optional subject) is not counted directly in the divisor when averaging your points. Instead, any grade point above 2.00 that you earn in this subject is added as a "bonus" to your total grade points.',
            tag: 'Calculation',
            icon: <HiBookOpen />,
            readTime: '4 min read',
            accent: '#006a4e',
            image: '/images/articles/gpa_calc.png'
        },
        {
            id: 2,
            title: t ? t('article_2_title') : 'Grading Scale Breakdown',
            p1: t ? t('article_2_p1') : 'The National Curriculum and Textbook Board (NCTB) follows a standardized grading scale for both SSC and HSC levels. It is crucial to understand that marks below 33 are considered a failing grade (F).',
            isGrading: true,
            tag: 'Official Scale',
            icon: <HiTrendingUp />,
            readTime: '6 min read',
            accent: '#f42a41',
            image: '/images/articles/grading_scale.png'
        },
        {
            id: 3,
            title: t ? t('article_3_title') : 'The Legend of \'Golden A+\'',
            p1: t ? t('article_3_p1') : 'You might often hear the term "Golden A+". Interestingly, this is not an official term found on any education board mark sheet. It is a prestigious colloquial term used by students, parents, and teachers to describe a result where a student has achieved an A+ (5.00) in every single compulsory subject individually.',
            tag: 'Myth vs Reality',
            icon: <HiShieldCheck />,
            readTime: '3 min read',
            accent: '#c2410c',
            image: '/images/articles/golden_aplus.png'
        }
    ];

    return (
        <section id="grading-system" className="py-24 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-[#006a4e] text-[10px] font-black uppercase tracking-widest mb-6">
                        Documentation Center
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        {t ? t('info_guide_title') : 'A Comprehensive Guide to BD Grading System'}
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
                        Master the complexities of the Bangladeshi secondary and higher secondary grading structures with our expert-verified guides.
                    </p>
                </div>

                <div className="space-y-32">
                    {articles.map((article, idx) => (
                        <article key={article.id} className={`flex flex-col lg:flex-row gap-12 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="lg:w-1/2 space-y-6">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
                                    <span className="text-white px-3 py-1 rounded-lg" style={{ backgroundColor: article.accent }}>
                                        #{article.id}
                                    </span>
                                    <span className="text-slate-400 flex items-center gap-1.5">
                                        <HiClock /> {article.readTime}
                                    </span>
                                    <span style={{ color: article.accent }} className="flex items-center gap-1.5">
                                        {article.icon} {article.tag}
                                    </span>
                                </div>

                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {article.title}
                                </h3>

                                <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed space-y-4">
                                    <p className="font-medium">{article.p1}</p>
                                    {article.p2 && <p className="opacity-80">{article.p2}</p>}
                                </div>

                                {article.isGrading && (
                                    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
                                        <div className="bg-slate-900 p-4 text-white text-xs font-bold uppercase tracking-widest flex justify-between">
                                            <span>Official Scale (SSC/HSC)</span>
                                            <span className="text-[#006a4e]">Verified</span>
                                        </div>
                                        <div className="p-2 bg-white">
                                            <table className="w-full text-sm">
                                                <tbody className="divide-y divide-slate-50">
                                                    {[
                                                        { range: '80 - 100', grade: 'A+', gp: '5.00' },
                                                        { range: '70 - 79', grade: 'A', gp: '4.00' },
                                                        { range: '60 - 69', grade: 'A-', gp: '3.50' },
                                                        { range: '50 - 59', grade: 'B', gp: '3.00' },
                                                        { range: '33 - 39', grade: 'D', gp: '1.00' },
                                                        { range: '00 - 32', grade: 'F', gp: '0.00' }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-3 font-bold text-slate-400">{row.range}</td>
                                                            <td className={`p-3 font-black ${row.grade === 'A+' ? 'text-[#006a4e]' : 'text-slate-900'}`}>{row.grade}</td>
                                                            <td className="p-3 font-bold text-slate-900 text-right">{row.gp}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <div className="relative aspect-[4/3] rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden group shadow-xl">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Abstract Pattern overlay */}
                                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* FAQ High-End Layout */}
                <div className="mt-40">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                        <div className="max-w-md text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                                <div className="p-3 bg-[#fef2f2] rounded-xl text-[#f42a41]">
                                    <HiAnnotation size={24} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    {t ? t('faq_title') : 'Scholar FAQ'}
                                </h3>
                            </div>
                            <p className="text-slate-500 font-medium">Quick answers to the most common questions about board regulations.</p>
                        </div>
                        <div className="hidden lg:block w-32 h-1 bg-[#006a4e]/20 rounded-full"></div>
                    </div>

                    <div className="grid gap-6 max-w-4xl">
                        <FAQItem
                            question={t ? t('faq_q1') : 'Does failing the 4th subject affect my result?'}
                            answer={t ? t('faq_a1') : 'No. Failing in your optional (4th) subject does not cause you to fail the entire exam. You simply won\'t receive any bonus points from it.'}
                            isOpen={openIndex === 0}
                            onClick={() => setOpenIndex(prev => prev === 0 ? -1 : 0)}
                        />
                        <FAQItem
                            question={t ? t('faq_q2') : 'What happens if I get F in one main subject?'}
                            answer={t ? t('faq_a2') : 'If you get an F (0.00) in any mandatory subject, your total GPA for the exam will be 0.00, regardless of how well you scored in other subjects.'}
                            isOpen={openIndex === 1}
                            onClick={() => setOpenIndex(prev => prev === 1 ? -1 : 1)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoArticles;
