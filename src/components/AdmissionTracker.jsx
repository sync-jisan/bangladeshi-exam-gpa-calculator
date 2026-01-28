import { motion } from 'framer-motion';

const AdmissionTracker = ({ result, subjects, config, t }) => {
    // Logic for eligibility
    const { gpa, hasFail } = result;
    const isCalculated = gpa > 0 || hasFail;
    const group = config?.group || 'science';

    // Helper to find subject point (lenient matching)
    // Returns 0 if subject not found or has no marks
    const getSubjectPoint = (keywords) => {
        if (!subjects || !Array.isArray(subjects)) return 0;

        const sub = subjects.find(s => {
            const name = (s.name || '').toLowerCase();
            return keywords.some(k => name.includes(k));
        });

        if (!sub || sub.grade === 'F') return 0;
        return parseFloat(sub.point) || 0;
    };

    // Calculate core subjects for Science (approximate)
    const mathPoint = getSubjectPoint(['math', 'ganit']);
    const physicsPoint = getSubjectPoint(['physic', 'podartho']);
    const chemPoint = getSubjectPoint(['chem', 'rosayon']);
    const bioPoint = getSubjectPoint(['bio', 'jib']);

    const hasScienceSubjects = mathPoint > 0 || physicsPoint > 0 || chemPoint > 0;

    // Helper to determine status and reason
    const getStatus = (trackId) => {
        if (!isCalculated) return { status: 'waiting', msg: null };
        if (hasFail) return { status: 'ineligible', msg: 'Has Failed Subject' };

        // 1. Medical College
        if (trackId === 'medical') {
            if (group !== 'science') return { status: 'ineligible', msg: 'Science Group Only' };
            // Need Bio & Chem
            if (hasScienceSubjects && (bioPoint < 3.5 || chemPoint < 3.5)) {
                return { status: 'unlikely', msg: 'Strong Bio/Chem needed' };
            }

            // GPA Guidance (Combined logic simulated by high current GPA)
            if (gpa >= 4.80) return { status: 'eligible', msg: 'Exam allowed (Likely)' };
            if (gpa >= 4.50) return { status: 'competitive', msg: 'Competitive Range' };
            return { status: 'unlikely', msg: 'below avg trend' };
        }

        // 2. Engineering
        if (trackId === 'engineering') {
            if (group !== 'science') return { status: 'ineligible', msg: 'Science Group Only' };

            // Check Math/Phy/Chem (If available)
            if (hasScienceSubjects) {
                if (mathPoint < 4.0 || physicsPoint < 4.0 || chemPoint < 4.0) {
                    return { status: 'unlikely', msg: 'High Math/Phy/Chem needed' };
                }
                if (mathPoint === 5.0 && physicsPoint === 5.0 && chemPoint === 5.0 && gpa >= 4.8) {
                    return { status: 'eligible', msg: 'Exam Permission Likely' };
                }
                // If points are ok but not perfect
                if (gpa >= 4.50) return { status: 'competitive', msg: 'Merit Score varies' };
            }

            // Fallback if subjects not strictly identified
            if (gpa === 5.00) return { status: 'eligible', msg: 'Exam Permission Likely' };
            if (gpa >= 4.50) return { status: 'competitive', msg: 'Competitive' };
            return { status: 'unlikely', msg: 'Low chance for Public Eng.' };
        }

        // 3. Public Univ
        if (trackId === 'public_univ') {
            // Open to all groups
            if (gpa >= 4.50) return { status: 'eligible', msg: 'Good chance (All Units)' };
            if (gpa >= 4.00) return { status: 'competitive', msg: 'Unit dependent' };
            if (gpa >= 3.50) return { status: 'competitive', msg: 'Specific Units only' };
            return { status: 'unlikely', msg: 'Very competitive' };
        }

        // 4. National Univ
        if (trackId === 'national') {
            if (gpa >= 3.00) return { status: 'eligible', msg: 'Eligible for Honours' };
            if (gpa >= 2.00) return { status: 'competitive', msg: 'Degree/Pass Course' };
            return { status: 'unlikely', msg: 'Minimum 2.00 usually required' };
        }

        return { status: 'waiting', msg: null };
    };

    const tracks = [
        {
            id: 'medical',
            label: t ? t('track_medical') : "Medical College (MBBS)",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            id: 'engineering',
            label: t ? t('track_engineering') : "Engineering (BUET/CKRUET)",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            id: 'public_univ',
            label: t ? t('track_public') : "Public University (General)",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            id: 'national',
            label: t ? t('track_national') : "National University",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-[#006a4e]/20 overflow-hidden flex flex-col"
        >
            {/* Header - Green with Red Accent */}
            <div className="bg-[#006a4e] p-4 flex items-center justify-between relative overflow-hidden shrink-0">
                {/* Decorative Red Strip */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f42a41]"></div>

                <div className="flex items-center gap-3 ml-2">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide" style={{ color: 'white' }}>
                        {t ? t('tracker_title') : 'Admission Guidance'}
                    </h3>
                </div>
            </div>

            <div className="p-4 bg-white space-y-3 flex-grow">
                {tracks.map((track) => {
                    const { status, msg } = getStatus(track.id);

                    // Default / Waiting / Base style
                    let containerStyle = "border-slate-100 bg-slate-50 opacity-60";
                    let iconStyle = "bg-slate-200 text-slate-400";
                    let textStyle = "text-slate-400";
                    let statusBadge = null;

                    if (status === 'eligible') {
                        // Success State
                        containerStyle = "border-[#006a4e]/20 bg-[#f0fdf4] opacity-100 shadow-sm ring-1 ring-[#006a4e]/50";
                        iconStyle = "bg-[#006a4e] text-white";
                        textStyle = "text-[#006a4e]";
                        statusBadge = (
                            <div className="flex flex-col items-end">
                                <span className="bg-[#006a4e] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-0.5">
                                    {t ? t('status_likely') : 'High Chance'}
                                </span>
                                {msg && <span className="text-[9px] text-slate-500 font-medium">{msg}</span>}
                            </div>
                        );
                    } else if (status === 'competitive') {
                        // Competitive State
                        containerStyle = "border-amber-200 bg-amber-50 opacity-100";
                        iconStyle = "bg-amber-100 text-amber-600";
                        textStyle = "text-amber-700";
                        statusBadge = (
                            <div className="flex flex-col items-end">
                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-0.5">
                                    {t ? t('status_competitive') : 'Competitive'}
                                </span>
                                {msg && <span className="text-[9px] text-slate-500 font-medium">{msg}</span>}
                            </div>
                        );
                    } else if (status === 'unlikely' && isCalculated) {
                        // Unlikely / Low Chance
                        containerStyle = "border-slate-200 bg-slate-50 opacity-80";
                        statusBadge = (
                            <div className="flex flex-col items-end">
                                <span className="bg-slate-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-0.5">
                                    Low Chance
                                </span>
                                {msg && <span className="text-[9px] text-slate-400 font-medium">{msg}</span>}
                            </div>
                        );
                    } else if (status === 'ineligible' && isCalculated) {
                        // Ineligible State
                        containerStyle = "border-red-100 bg-red-50 opacity-70";
                        iconStyle = "bg-red-100 text-red-400";
                        statusBadge = (
                            <div className="flex flex-col items-end">
                                <div className="text-red-500 text-[10px] font-bold px-2 py-0.5 border border-red-200 rounded-full mb-0.5 bg-white">
                                    Not Eligible
                                </div>
                                {msg && <span className="text-[9px] text-red-400 font-medium">{msg}</span>}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={track.id}
                            className={`flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 p-3 rounded-xl border transition-all duration-300 ${containerStyle}`}
                        >
                            {/* Icon Box */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${iconStyle}`}>
                                {track.icon}
                            </div>

                            {/* Text Content */}
                            <div className="flex-grow min-w-0">
                                <h4 className={`font-bold text-sm leading-tight truncate ${textStyle}`}>
                                    {track.label}
                                </h4>
                            </div>

                            {/* Status Badge */}
                            {statusBadge && (
                                <div className="shrink-0 ml-2">
                                    {statusBadge}
                                </div>
                            )}
                        </div>
                    );
                })}

                {!isCalculated && (
                    <div className="text-center p-2 pt-1">
                        <p className="text-xs text-slate-400 italic">
                            {t ? t('tracker_placeholder') : 'Calculate your GPA to see guidance.'}
                        </p>
                    </div>
                )}
            </div>

            {/* Disclaimer Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100">
                <p className="text-[10px] leading-relaxed text-slate-400 text-center">
                    <span className="font-bold text-amber-500">⚠ Disclaimer: </span>
                    {t ? t('tracker_disclaimer') : 'This tool provides guidance based on historical admission patterns. Always follow official admission circulars.'}
                </p>
            </div>
        </motion.div>
    );
};

export default AdmissionTracker;
