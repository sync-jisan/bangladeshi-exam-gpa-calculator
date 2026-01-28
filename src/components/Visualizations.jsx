import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const Visualizations = ({ subjects, config, t }) => {
    if (!subjects || subjects.length === 0) return null;

    const isSpecial = config?.year === '2022-23';
    const passMark = isSpecial ? 17 : 33;
    const aPlusMark = isSpecial ? 40 : 80;
    const maxMark = isSpecial ? 50 : 100;

    const data = subjects
        .filter(s => s.marks !== '' && s.marks !== null)
        .map(s => ({
            name: s.name ? s.name.substring(0, 3).toUpperCase() : 'SUB',
            fullName: s.name || 'Untitled',
            marks: parseFloat(s.marks),
        }));

    if (data.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t border-slate-100">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
                {t ? t('analytics_title') : 'Performance Analytics'}
            </h4>

            <div className="h-64 w-full bg-white rounded-xl p-4 border border-slate-100 shadow-inner">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, maxMark]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                color: '#1e293b',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            cursor={{ fill: '#f1f5f9' }}
                        />
                        <Bar dataKey="marks" radius={[4, 4, 0, 0]} maxBarSize={50}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.marks < passMark ? '#ef4444' : (entry.marks >= aPlusMark ? '#006a4e' : '#3b82f6')}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3 font-medium">
                {t ? t('analytics_subtitle') : 'Marks per Subject Overview'}
            </p>
        </div>
    );
};

export default Visualizations;
