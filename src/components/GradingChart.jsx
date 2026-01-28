import { motion } from 'framer-motion';
import { GRADING_SCALES } from '../utils/ssc_constants';

const GradingChart = ({ config, t }) => {
    // Default to standard if config is missing (e.g. init)
    const examYear = config?.year || 'standard';
    const currentScale = examYear === '2022-23' ? GRADING_SCALES.SPECIAL_50 : GRADING_SCALES.STANDARD;
    const isSpecialYear = examYear === '2022-23';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
        >
            {/* Minimal Grading Scale Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-[#006a4e] p-4 flex items-center justify-between">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                        {t ? t('chart_title') : 'Grading Scale'}
                        <span className="opacity-70 font-normal normal-case ml-1">
                            {isSpecialYear
                                ? (t ? t('chart_special') : '(Special 50)')
                                : (t ? t('chart_standard') : '(Standard 100)')}
                        </span>
                    </h3>
                    <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>

                <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-3 bg-slate-50 text-[10px] uppercase font-bold text-slate-500 py-2 px-4 tracking-wider">
                        <span>{t ? t('chart_range') : 'Range'}</span>
                        <span className="text-center">{t ? t('chart_grade') : 'Grade'}</span>
                        <span className="text-right">{t ? t('chart_point') : 'Point'}</span>
                    </div>
                    {currentScale.map((scale, i) => (
                        <div key={i} className={`grid grid-cols-3 py-3 px-4 text-sm items-center hover:bg-slate-50 transition-colors ${scale.grade === 'F' ? 'bg-red-50/30' : ''}`}>
                            <span className="font-medium text-slate-600">{scale.min}-{scale.max}</span>
                            <span className={`text-center font-bold px-2 py-0.5 rounded-md w-fit mx-auto ${scale.grade === 'A+' ? 'bg-[#006a4e] text-white' :
                                    scale.grade === 'F' ? 'bg-[#f42a41] text-white' :
                                        'bg-slate-100 text-slate-700'
                                }`}>{scale.grade}</span>
                            <span className="text-right font-mono font-bold text-slate-800">{scale.point.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Rules */}
            <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t ? t('rules_title') : 'Key Rules'}
                </h3>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
                        <p>{t ? t('rule_gpa') : 'Total GPA is the average of all subjects excluding the 4th subject.'}</p>
                    </li>
                    {!isSpecialYear && (
                        <li className="flex gap-3 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
                            <p>{t ? t('rule_4th') : 'Points above 2.00 in the 4th subject are added as a generally bonus.'}</p>
                        </li>
                    )}
                    <li className="flex gap-3 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f42a41] mt-2 shrink-0"></span>
                        <p className="font-medium text-[#f42a41]">
                            {t ? t('rule_fail') : 'Failing in any compulsory subject results in a total GPA of 0.00.'}
                        </p>
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};

export default GradingChart;
