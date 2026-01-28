import { motion } from 'framer-motion';
import { getGradeInfo } from '../utils/ssc_calculator';

const SubjectRow = ({ subject, updateSubject, removeSubject, canDelete, config, t }) => {
    // Determine exam year mode
    const examYear = config?.year || 'standard';

    // Calculate grade info
    const { grade, point } = getGradeInfo(subject.marks, examYear);
    const isFail = grade === 'F';
    const showOptionalCheckbox = examYear !== '2022-23';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`group relative flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white border border-slate-200 hover:border-[#006a4e]/40 hover:shadow-lg transition-all duration-300 ${isFail && subject.marks ? 'ring-2 ring-red-100' : ''}`}
        >
            {/* Subject Info */}
            <div className="flex-grow min-w-[200px]">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#006a4e]"></span>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {t ? t('col_subject') : 'Subject'}
                    </label>
                </div>
                <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                    placeholder={t ? t('placeholder_subject') : "Enter subject name..."}
                    className="w-full text-base font-semibold text-slate-800 placeholder:text-slate-300 bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-[#006a4e] focus:ring-0 px-0 py-1 transition-colors"
                />
            </div>

            {/* Marks Input */}
            <div className="w-24 shrink-0">
                <div className="flex items-center gap-2 mb-1.5 justify-center">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {t ? t('col_marks') : 'Marks'}
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="number"
                        value={subject.marks}
                        onChange={(e) => updateSubject(subject.id, 'marks', e.target.value)}
                        placeholder="00"
                        min="0"
                        max="100"
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#006a4e] focus:bg-white rounded-lg px-3 py-2 text-center font-mono font-bold text-lg text-slate-800 transition-all outline-none"
                    />
                    {subject.marks && (
                        <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${isFail ? 'bg-[#f42a41]' : 'bg-[#006a4e]'}`}>
                            {grade}
                        </div>
                    )}
                </div>
            </div>

            {/* Point Display (Desktop) */}
            <div className="hidden md:flex flex-col items-center w-20 shrink-0 border-l border-slate-100 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t ? t('col_point') : 'Point'}
                </span>
                <span className={`text-lg font-mono font-bold ${isFail && subject.marks ? 'text-[#f42a41]' : 'text-slate-600'}`}>
                    {point.toFixed(2)}
                </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 shrink-0 border-l border-slate-100 pl-4">
                {showOptionalCheckbox && (
                    <button
                        onClick={() => updateSubject(subject.id, 'isOptional', !subject.isOptional)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${subject.isOptional
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                    >
                        {t ? t('badge_4th') : '4th Sub'}
                    </button>
                )}
                {canDelete && (
                    <button
                        onClick={() => removeSubject(subject.id)}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        {t ? t('btn_remove') : 'Remove'}
                    </button>
                )}
            </div>

        </motion.div>
    );
};

export default SubjectRow;
