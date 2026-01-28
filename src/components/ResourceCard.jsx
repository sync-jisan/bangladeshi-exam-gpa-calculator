import React from 'react';
import { motion } from 'framer-motion';

const ResourceCard = ({ t }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-[#006a4e]/20 overflow-hidden"
        >
            {/* Header - Green with Red Accent */}
            <div className="bg-[#006a4e] p-4 flex items-center gap-3 relative overflow-hidden">
                {/* Decorative Red Strip */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f42a41]"></div>

                <svg className="w-5 h-5 text-white ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <h3 className="text-white font-bold text-sm uppercase tracking-wide" style={{ color: 'white' }}>
                    {t ? t('res_title') : 'Official Resources'}
                </h3>
            </div>

            <div className="p-4 bg-white">
                <ul className="space-y-2">
                    <li>
                        <a
                            href="http://www.educationboardresults.gov.bd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-[#f42a41] hover:shadow-md transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#006a4e] group-hover:bg-[#006a4e] group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-[#f42a41] transition-colors">
                                {t ? t('res_link_board') : 'Education Board Results'}
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="http://www.moedu.gov.bd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-[#f42a41] hover:shadow-md transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-[#f42a41] transition-colors">
                                {t ? t('res_link_ministry') : 'Ministry of Education'}
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="http://www.nu.ac.bd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-[#f42a41] hover:shadow-md transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-[#f42a41] transition-colors">
                                {t ? t('res_link_nu') : 'National University'}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};

export default ResourceCard;
