import { useState } from 'react';
import { useGPACalculator } from '../hooks/useGPACalculator';
import { AnimatePresence } from 'framer-motion';
import SubjectInput from './SubjectInput';
import ResultDisplay from './ResultDisplay';
import GradingChart from './GradingChart';
import ValidationPopup from './ValidationPopup';
import ResourceCard from './ResourceCard';
import AdmissionTracker from './AdmissionTracker';
import InfoArticles from './InfoArticles';
import Newsletter from './Newsletter';
import Footer from './Footer';
import ChatBot from './ChatBot';

const CalculatorPage = ({ examType, language, t }) => {
    const {
        subjects,
        addSubject,
        removeSubject,
        updateSubject,
        resetCalculator,
        result,
        config,
        updateConfig
    } = useGPACalculator(examType);

    const [showResult, setShowResult] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleCalculate = () => {
        const hasEmptyMarks = subjects.some(s => s.marks === '' || s.marks === null || s.marks === undefined);
        if (hasEmptyMarks) {
            setShowPopup(true);
            return;
        }
        setShowResult(true);
        setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-10">
            {/* Hero Section */}
            <section className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-[#006a4e] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]"></span>
                    </span>
                    {language === 'bn' ? 'অফিসিয়াল ক্যালকুলেটর' : 'Official Calculator'}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#1e293b] tracking-tight mb-4">
                    <span className="text-[#006a4e]">{examType}</span> {language === 'bn' ? 'জিপিএ ক্যালকুলেটর' : 'GPA Calculator'}
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
                    {language === 'bn'
                        ? `${examType} পরীক্ষার ফলাফল নির্ভুলভাবে গণনা করুন আমাদের স্মার্ট এবং সহজ জিপিএ ক্যালকুলেটর দিয়ে।`
                        : `Calculate your ${examType} results accurately with our smart and easy-to-use GPA calculator.`}
                </p>
            </section>

            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <SubjectInput
                        subjects={subjects}
                        addSubject={() => { setShowResult(false); addSubject(); }}
                        removeSubject={(id) => { setShowResult(false); removeSubject(id); }}
                        updateSubject={(...args) => { setShowResult(false); updateSubject(...args); }}
                        resetCalculator={() => { setShowResult(false); resetCalculator(); }}
                        config={config}
                        updateConfig={(key, val) => { setShowResult(false); updateConfig(key, val); }}
                        handleCalculate={handleCalculate}
                        t={t}
                    />
                    <ResourceCard t={t} />
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-8">
                    <AnimatePresence mode="wait">
                        {showResult ? (
                            <ResultDisplay
                                key="results"
                                subjects={subjects}
                                result={result}
                                showResult={true}
                                config={config}
                                t={t}
                            />
                        ) : (
                            <GradingChart key="grading-chart" config={config} t={t} />
                        )}
                    </AnimatePresence>
                    <AdmissionTracker result={result} subjects={subjects} config={config} t={t} />
                </div>
            </main>

            <InfoArticles t={t} />
            <Newsletter t={t} result={result} subjects={subjects} config={config} />
            <Footer t={t} />

            <ValidationPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                message={t('popup_msg')}
                title={t('popup_title')}
                btnText={t('popup_btn')}
            />

        </div>
    );
};

export default CalculatorPage;
