import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const ValidationPopup = ({ isOpen, onClose, message, title, btnText }) => {
    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
                            className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center border border-slate-100 relative overflow-hidden"
                        >
                            {/* Decorative Top Border */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f42a41]"></div>

                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#f42a41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                {title || "Wait a Second!"}
                            </h3>
                            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                                {message || "Please check your inputs carefully before calculating."}
                            </p>

                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-[#f42a41] hover:bg-[#d92237] text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95"
                            >
                                {btnText || "Okay, I'll Fix It"}
                            </button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ValidationPopup;
