import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPaperAirplane, HiSparkles, HiShieldCheck, HiLightBulb, HiTrash, HiArrowLeft } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Bytez from "bytez.js";
import { Link } from 'react-router-dom';

const BGC_AGENT_API_KEY = "9e0c49354366e6e2d17ed0e5ac000dcb";
const sdk = new Bytez(BGC_AGENT_API_KEY);
const model = sdk.model("openai/gpt-4.1");

const SYSTEM_PROMPT = `
You are "BGC AGENT", a highly intelligent academic assistant powered by the proprietary **BGC-4.1** model.
Identity: Specialized for Bangladeshi education. Developer: Shahria Hossain Jisan.
`;

const BgcGlow = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#006a4e]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#f42a41]/5 blur-[100px] rounded-full"></div>
    </div>
);

const SUGGESTION_POOL = [
    { id: 'gpa', label_en: 'How GPA is calculated?', label_bn: 'জিপিএ কিভাবে গণনা করা হয়?', query: 'Explain the detailed GPA calculation including 4th subject bonus.' },
    { id: 'medical', label_en: 'Medical Entry Rules?', label_bn: 'মেডিকেল ভর্তির নিয়ম?', query: 'What are the requirements for Medical admission in Bangladesh?' },
    { id: 'engineering', label_en: 'Engineering Admission?', label_bn: 'ইঞ্জিনিয়ারিং ভর্তি?', query: 'What do I need for Engineering university admission?' },
    { id: 'golden', label_en: 'What is Golden A+?', label_bn: 'গোল্ডেন এ+ কি?', query: 'Explain what Golden A+ means in the context of SSC/HSC.' },
    { id: 'passing', label_en: 'Passing marks?', label_bn: 'পাস মার্ক কত?', query: 'What are the passing marks for SSC and HSC exams?' },
    { id: 'subject4', label_en: '4th Subject Benefit?', label_bn: '৪র্থ বিষয়ের সুবিধা?', query: 'Detailed explanation of 4th subject bonus marks.' },
    { id: 'technical', label_en: 'Technical Board Rules?', label_bn: 'কারিগরি বোর্ডের নিয়ম?', query: 'How does grading work for the Technical Education Board?' },
    { id: 'madrasah', label_en: 'Madrasah Board Grading?', label_bn: 'মাদ্রাসা বোর্ড গ্রেডিং?', query: 'What are the specific grading rules for Madrasah board?' }
];

const BgcAgentPage = ({ language = 'en' }) => {
    const [messages, setMessages] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial message based on language
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                role: 'assistant',
                content: language === 'bn'
                    ? 'হ্যালো! আমি BGC AGENT। আমি BGC-4.1 দ্বারা চালিত আপনার পার্সোনাল এআই অ্যাডভাইজার। আজ আপনাকে কিভাবে সাহায্য করতে পারি?'
                    : 'Hello! I am **BGC AGENT**, your personal AI academic advisor powered by **BGC-4.1**. How can I assist you today?'
            }]);
        }
    }, [language, messages.length]);

    // Randomize suggestions on mount
    useEffect(() => {
        const shuffled = [...SUGGESTION_POOL].sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 4));
    }, []);

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
            const errMsg = language === 'bn' ? 'দুঃখিত, সংযোগে সমস্যা হচ্ছে।' : 'Sorry, connection failed.';
            setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex flex-col items-center py-6 md:py-12 bg-white relative overflow-hidden">
            <BgcGlow />
            <div className="w-full max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#006a4e] border border-slate-100 transition-colors">
                        <HiArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            BGC <span className="text-[#006a4e]">AGENT</span>
                        </h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Advanced BGC-4.1 Intelligence</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100 text-[#006a4e] text-xs font-bold uppercase tracking-widest shadow-sm">
                    <HiShieldCheck className="w-4 h-4" />
                    Official Academic Support
                </div>
            </div>

            <div className="w-full max-w-4xl flex-grow flex flex-col bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden h-[70vh]">
                <div className="flex-grow p-6 md:p-10 overflow-y-auto space-y-8 scroll-smooth">
                    {messages.map((msg, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={i}
                            className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'} items-start gap-4`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-xl bg-[#006a4e] flex-shrink-0 flex items-center justify-center text-white shadow-lg">
                                    <HiSparkles size={16} />
                                </div>
                            )}
                            <div className={`max-w-[85%] p-5 md:p-7 rounded-3xl text-sm md:text-base leading-relaxed ${msg.role === 'assistant' ? 'bg-white text-slate-700 shadow-sm border border-slate-100' : 'bg-[#006a4e] text-white shadow-xl'
                                }`}>
                                {msg.role === 'assistant' ? (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                                            strong: ({ ...props }) => <strong className="font-black text-[#006a4e]" {...props} />,
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                ) : <p className="font-medium">{msg.content}</p>}
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start items-center gap-4">
                            <div className="w-8 h-8 rounded-xl bg-[#006a4e] flex items-center justify-center text-white"><HiSparkles className="animate-pulse" /></div>
                            <div className="flex gap-1">
                                {[0, 1, 2].map(i => (
                                    <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 bg-[#006a4e] rounded-full" />
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {messages.length < 3 && !isLoading && (
                    <div className="px-10 pb-6">
                        <div className="flex flex-wrap gap-3">
                            {suggestions.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => handleSend(s.query)}
                                    className="px-4 py-2 bg-white hover:bg-green-50 text-[#006a4e] border border-green-100 rounded-xl transition-all text-xs font-bold shadow-sm active:scale-95"
                                >
                                    {language === 'bn' ? s.label_bn : s.label_en}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-6 md:p-8 bg-white border-t border-slate-100">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-4 relative">
                        <input
                            type="text"
                            placeholder={language === 'bn' ? 'BGC এজেন্ট আপনার বার্তার অপেক্ষায়...' : 'Ask BGC AGENT...'}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 md:py-5 text-sm md:text-base outline-none focus:border-[#006a4e] focus:bg-white transition-all pr-16 shadow-inner"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-[#006a4e] text-white rounded-xl shadow-lg hover:bg-[#004d39] transition-all disabled:opacity-30">
                            <HiPaperAirplane className="rotate-90 w-5 h-5" />
                        </button>
                    </form>
                    <div className="mt-4 flex justify-between items-center px-2">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Press Enter to send</p>
                        <button onClick={() => setMessages([messages[0]])} className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase tracking-widest transition-colors"><HiTrash size={14} /> Clear History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BgcAgentPage;
