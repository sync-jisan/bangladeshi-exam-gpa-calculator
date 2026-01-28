import { motion, AnimatePresence } from 'framer-motion';
import SubjectRow from './SubjectRow';
import { EXAM_CONFIG } from '../utils/ssc_constants';

const SubjectInput = ({ subjects, addSubject, removeSubject, updateSubject, resetCalculator, handleCalculate, config, updateConfig, t }) => {

    const getYearLabel = (yearId) => {
        if (!t) return yearId;
        if (yearId === 'standard') return t('opt_standard');
        if (yearId === '2022-23') return t('opt_22_23');
        return yearId;
    };

    const getGroupLabel = (groupId) => {
        if (!t) return groupId;
        if (groupId === 'science') return t('opt_group_science');
        if (groupId === 'humanities') return t('opt_group_humanities');
        if (groupId === 'business') return t('opt_group_business');
        return groupId;
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200"
        >
            {/* Exam Configuration Panel */}
            <div className="mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    {t ? t('config_title') : 'Exam Configuration'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Exam Year Selector */}
                    {EXAM_CONFIG[config.examType]?.years.length > 1 && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">
                                {t ? t('label_session') : 'Session / Syllabus'}
                            </label>
                            <select
                                value={config?.year || 'standard'}
                                onChange={(e) => updateConfig('year', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 focus:border-[#006a4e] focus:ring-2 focus:ring-[#006a4e]/10 outline-none"
                            >
                                {EXAM_CONFIG[config.examType].years.map(y => (
                                    <option key={y.id} value={y.id}>{getYearLabel(y.id)}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Group Selector */}
                    {EXAM_CONFIG[config.examType]?.groups.length > 1 && (
                        <div className={EXAM_CONFIG[config.examType]?.years.length <= 1 ? "md:col-span-2" : ""}>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">
                                {t ? t('label_group') : 'Group'}
                            </label>
                            <select
                                value={config?.group || 'science'}
                                onChange={(e) => updateConfig('group', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 focus:border-[#006a4e] focus:ring-2 focus:ring-[#006a4e]/10 outline-none"
                            >
                                {EXAM_CONFIG[config.examType].groups.map(g => (
                                    <option key={g.id} value={g.id}>{getGroupLabel(g.id)}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <div className="mt-3 text-[11px] text-slate-400">
                    {t ? t('config_note') : '* Changing these settings will reset your subject list to the default for that group.'}
                </div>
            </div>

            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#006a4e] border border-[#bbf7d0]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-bold text-[#006a4e]">
                            {t ? t('section_subject_data') : 'Subject Data'}
                        </h2>
                        <p className="text-xs text-slate-500 font-medium">
                            {t ? t('section_subject_subtitle') : 'Enter your marks below'}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={resetCalculator} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#f42a41] rounded-lg transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {t ? t('btn_reset') : 'Reset'}
                    </button>
                    {(config?.year !== '2022-23') && (
                        <button onClick={addSubject} className="px-5 py-2 text-sm font-bold text-white bg-[#006a4e] hover:bg-[#00523e] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {t ? t('btn_add_subject') : 'Add Subject'}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                    {subjects.map((subject) => (
                        <SubjectRow
                            key={subject.id}
                            subject={subject}
                            updateSubject={updateSubject}
                            removeSubject={removeSubject}
                            canDelete={subjects.length > 1}
                            config={config}
                            t={t}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {subjects.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCalculate}
                        className="w-full md:w-auto px-12 py-4 bg-[#f42a41] hover:bg-[#dc2626] text-white font-display font-bold text-lg rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-3"
                    >
                        <span>{t ? t('btn_calculate') : 'Calculate Results'}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            )}
        </motion.section>
    );
};

export default SubjectInput;
