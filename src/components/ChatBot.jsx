import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChatAlt2, HiX, HiPaperAirplane, HiLightBulb } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Bytez from "bytez.js";

const BGC_AGENT_API_KEY = "9e0c49354366e6e2d17ed0e5ac000dcb";
const sdk = new Bytez(BGC_AGENT_API_KEY);
const model = sdk.model("openai/gpt-4.1");

const SYSTEM_PROMPT = `
You are "BGC AGENT", a highly intelligent academic assistant powered by the proprietary **BGC-4.1** model.
- You are a custom AI specialized for the Bangladeshi education system.
- The developer is Shahria Hossain Jisan.
- Knowledge: SSC, HSC, JSC calculators, 4th subject rules, admission tracks.
`;

const SUGGESTION_POOL = [
    { id: 'gpa', label_en: 'How GPA is calculated?', label_bn: 'জিপিএ কিভাবে গণনা করা হয়?', query: 'Explain the detailed GPA calculation including 4th subject bonus.' },
    { id: 'medical', label_en: 'Medical Entry Rules?', label_bn: 'মেডিকেল ভর্তির নিয়ম?', query: 'What are the requirements for Medical admission in Bangladesh?' },
    { id: 'engineering', label_en: 'Engineering Admission?', label_bn: 'ইঞ্জিনিয়ারিং ভর্তি?', query: 'What do I need for Engineering university admission?' },
    { id: 'golden', label_en: 'What is Golden A+?', label_bn: 'গোল্ডেন এ+ কি?', query: 'Explain what Golden A+ means in the context of SSC/HSC.' },
    { id: 'passing', label_en: 'Passing marks?', label_bn: 'পাস মার্ক কত?', query: 'What are the passing marks for SSC and HSC exams?' },
    { id: 'subject4', label_en: '4th Subject Benefit?', label_bn: '৪র্থ বিষয়ের সুবিধা?', query: 'Detailed explanation of 4th subject bonus marks.' }
];

const TypingSkeleton = () => (
    <div className="flex flex-col gap-2 w-full max-w-[80%] animate-pulse">
        <div className="h-3 bg-slate-200 rounded-full w-full"></div>
        <div className="h-3 bg-slate-200 rounded-full w-[90%]"></div>
        <div className="h-3 bg-slate-200 rounded-full w-[70%]"></div>
    </div>
);

const ChatBot = ({ language = 'en' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTip, setShowTip] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Get 3 random suggestions on mount
    useEffect(() => {
        const shuffled = [...SUGGESTION_POOL].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 3));
    }, [isOpen]);

    // Update initial message based on language
    useEffect(() => {
        if (messages.length <= 1) {
            setMessages([{
                role: 'assistant',
                content: language === 'bn'
                    ? 'হ্যালো! আমি BGC AGENT। আমি BGC-4.1 দ্বারা চালিত। আমি আপনাকে কিভাবে সাহায্য করতে পারি?'
                    : 'Hello! I am **BGC AGENT**, powered by **BGC-4.1**. How can I assist you today?'
            }]);
        }
    }, [language, messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSend = async (customInput = null) => {
        const userMsg = (customInput || input).trim();
        if (!userMsg || isLoading) return;

        const newMessages = [...messages, { role: 'user', content: userMsg }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await model.run([{ role: "system", content: SYSTEM_PROMPT }, ...newMessages]);
            const output = response?.output || response;
            let aiContent = typeof output === 'string' ? output : (output.content || output.text || String(output));
            setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
        } catch {
            const errMsg = language === 'bn' ? 'দুঃখিত, সংযোগে সমস্যা হচ্ছে।' : 'Sorry, I am having trouble connecting.';
            setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] font-sans no-print">
            {/* Proactive Help Bubble */}
            <AnimatePresence>
                {!isOpen && showTip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-16 right-0 mb-1"
                    >
                        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl px-4 py-3 min-w-[180px] relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowTip(false); }}
                                className="absolute -top-2 -right-2 bg-white border border-slate-100 rounded-full p-0.5 text-slate-400 hover:text-red-500 shadow-sm"
                            >
                                <HiX size={10} />
                            </button>
                            <p className="text-[11px] font-bold text-slate-700 leading-tight">
                                {language === 'bn' ? 'আমি আপনাকে কিভাবে সাহায্য করতে পারি?' : 'How can I help you?'}
                            </p>
                            <div className="text-[9px] text-[#006a4e] font-black uppercase tracking-widest mt-1 opacity-60">BGC AGENT AI</div>
                            {/* Triangle tail */}
                            <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) setShowTip(false);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${isOpen ? 'bg-[#f42a41]' : 'bg-[#006a4e]'} text-white`}
            >
                {isOpen ? <HiX size={22} /> : <HiChatAlt2 size={22} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-16 right-0 w-[300px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#006a4e] p-5 flex flex-col items-center justify-center gap-2 border-b border-[#004d39] shadow-lg">
                            <div className="w-12 h-12">
                                <img src="/BGC_chatbotlogo.png" alt="BGC" className="w-12 h-12 object-contain" />
                            </div>
                            <div className="text-center">
                                <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">BGC AGENT</span>
                                <div className="text-[7px] text-white/50 font-black uppercase tracking-[0.3em] mt-0.5">BGC-4.1 MODEL</div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[92%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-white text-slate-700 border border-slate-100' : 'bg-[#006a4e] text-white'
                                        }`}>
                                        {msg.role === 'assistant' ? (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    strong: ({ ...props }) => <strong className="font-bold text-[#006a4e]" {...props} />,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        ) : msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && <TypingSkeleton />}

                            {!isLoading && (
                                <div className="space-y-2 pt-2">
                                    <p className="text-[9px] text-slate-400 font-bold uppercase ml-1 flex items-center gap-1">
                                        <HiLightBulb className="text-amber-500" /> Suggested for you
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                        {suggestions.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => handleSend(s.query)}
                                                className="text-left text-[10px] p-2 bg-white hover:bg-green-50 text-[#006a4e] border border-green-100 rounded-lg transition-colors font-medium shadow-sm active:scale-95"
                                            >
                                                {language === 'bn' ? s.label_bn : s.label_en}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-slate-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1 border border-slate-200 focus-within:border-[#006a4e] focus-within:bg-white transition-all shadow-inner"
                            >
                                <input
                                    type="text"
                                    placeholder={language === 'bn' ? 'বার্তা...' : 'Ask expert BGC-4.1...'}
                                    className="flex-grow bg-transparent border-none text-[11px] outline-none py-2 focus:ring-0 text-slate-700"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button type="submit" disabled={!input.trim() || isLoading} className="text-[#006a4e] p-1.5 hover:bg-green-50 rounded-full transition-colors active:scale-95 disabled:opacity-30">
                                    <HiPaperAirplane size={18} className="rotate-90" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;
