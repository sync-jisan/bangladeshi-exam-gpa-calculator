import { motion } from 'framer-motion';
import { getGradeInfo } from '../utils/ssc_calculator';
import Visualizations from './Visualizations';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ResultDisplay = ({ subjects, result, config, t }) => {
    const { gpa, gradeLetter, hasFail } = result;
    const examYearLabel = config?.year === '2022-23' ? 'SSC 2022-23 (Special)' : 'SSC Standard';
    const groupLabel = config?.group ? config.group.charAt(0).toUpperCase() + config.group.slice(1) : '';

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Colors
        const primaryColor = [0, 106, 78]; // #006a4e
        const secondaryColor = [244, 42, 65]; // #f42a41

        // Header Background
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 40, 'F');

        // Header Text
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('OFFICIAL GRADE SHEET', 105, 18, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Bangladeshi Exam GPA Calculator', 105, 25, { align: 'center' });

        // Student Info Section
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(12);
        doc.text(`Exam Session: ${examYearLabel}`, 15, 55);
        doc.text(`Group: ${groupLabel}`, 15, 62);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 69);

        // Result Summary Box
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.line(130, 50, 195, 50); // Top

        doc.setFontSize(14);
        doc.setTextColor(...(hasFail ? secondaryColor : primaryColor));
        doc.setFont('helvetica', 'bold');
        doc.text(`GPA: ${gpa.toFixed(2)}`, 162, 60, { align: 'center' });

        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(`Grade: ${gradeLetter}`, 162, 66, { align: 'center' });

        doc.setFontSize(9);
        doc.setTextColor(...(hasFail ? secondaryColor : primaryColor));
        doc.text(hasFail ? 'RESULT: NOT PROMOTED' : 'RESULT: PASSED', 162, 72, { align: 'center' });

        // Table Data Preparation
        const tableColumn = ["Subject Name", "Marks", "Letter Grade", "Grade Point"];
        const tableRows = subjects.map((sub, idx) => {
            const info = getGradeInfo(sub.marks, config?.year);
            return [
                (sub.name || `Subject ${idx + 1}`) + (sub.isOptional ? ' (4th Sub)' : ''),
                sub.marks || '-',
                info.grade,
                info.point.toFixed(2)
            ];
        });

        // Add Footer Row
        tableRows.push([
            { content: 'Total GPA', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: gpa.toFixed(2), styles: { fontStyle: 'bold', textColor: primaryColor } }
        ]);

        // Generate Table
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 85,
            theme: 'grid',
            headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: {
                fontSize: 9,
                textColor: [50, 50, 50],
                cellPadding: 3
            },
            columnStyles: {
                0: { halign: 'left' },
                1: { halign: 'center' },
                2: { halign: 'center', fontStyle: 'bold' },
                3: { halign: 'right', fontStyle: 'bold' }
            },
            alternateRowStyles: {
                fillColor: [240, 253, 244] // Light green tint
            },
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index === 2) {
                    if (data.cell.raw === 'F') {
                        data.cell.styles.textColor = secondaryColor;
                    } else if (data.cell.raw === 'A+') {
                        data.cell.styles.textColor = primaryColor;
                    }
                }
            }
        });

        // Footer Disclaimer
        const finalY = doc.lastAutoTable.finalY + 20;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('This is a computer-generated grade sheet.', 105, finalY, { align: 'center' });
        doc.text('Developed with <3 for Bangladeshi Students', 105, finalY + 5, { align: 'center' });

        // Save
        doc.save(`BD_GPA_Result_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <motion.div
            id="results-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
        >
            <div id="report-container" className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#006a4e] relative overflow-hidden">
                {/* Watermark Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
                    <img src="/bd-calculatorlogo.png" alt="" className="w-full h-full object-contain" />
                </div>

                {/* Main Scorecard */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-6">
                        <div className={`w-36 h-36 rounded-full flex flex-col items-center justify-center border-8 shadow-inner ${hasFail ? 'bg-red-50 border-red-100' : 'bg-[#f0fdf4] border-[#bbf7d0]'
                            }`}>
                            <span className={`text-4xl font-bold ${hasFail ? 'text-[#f42a41]' : 'text-[#006a4e]'}`}>
                                {gpa.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                                {t ? t('result_gpa') : 'GPA'}
                            </span>
                        </div>

                        <div>
                            <div className="mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#006a4e] px-2 py-0.5 rounded mr-2">{config?.year === '2022-23' ? '2022-23' : 'STD'}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    {t ? t('result_overall_grade') : 'Overall Grade'}
                                </span>
                            </div>
                            <h2 className={`text-6xl font-display font-bold leading-none ${hasFail ? 'text-[#f42a41]' : 'text-[#006a4e]'}`}>
                                {gradeLetter}
                            </h2>
                            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${hasFail ? 'bg-red-100 text-[#f42a41]' : 'bg-green-100 text-[#006a4e]'
                                }`}>
                                {hasFail
                                    ? (t ? t('result_failed') : 'Not Promoted')
                                    : (t ? t('result_passed') : 'Passed Successfully')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="mb-8 overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#006a4e] text-white text-xs uppercase font-bold tracking-wider">
                                <th className="p-4">{t ? t('table_subject') : 'Subject Name'}</th>
                                <th className="p-4 text-center">{t ? t('table_marks') : 'Marks Obtain'}</th>
                                <th className="p-4 text-center">{t ? t('table_grade') : 'Letter Grade'}</th>
                                <th className="p-4 text-right">{t ? t('table_point') : 'Grade Point'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {subjects.map((sub, idx) => {
                                const info = getGradeInfo(sub.marks, config?.year);
                                return (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors bg-white">
                                        <td className="p-4 font-semibold text-slate-700">
                                            {sub.name || `Paper ${idx + 1}`}
                                            {sub.isOptional && <span className="ml-2 text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded uppercase border border-yellow-200">4th Sub</span>}
                                        </td>
                                        <td className="p-4 text-center font-mono font-medium text-slate-600">{sub.marks || '-'}</td>
                                        <td className={`p-4 text-center font-bold ${info.grade === 'F' ? 'text-[#f42a41]' : 'text-[#006a4e]'}`}>
                                            <span className={`px-2 py-1 rounded ${info.grade === 'F' ? 'bg-red-50' : 'bg-green-50'}`}>
                                                {info.grade}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-mono font-bold text-slate-800">{info.point.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-700">
                            <tr>
                                <td className="p-4 text-right" colSpan="3">{t ? t('table_total_gpa') : 'Total GPA'}</td>
                                <td className="p-4 text-right text-[#006a4e] text-lg">{gpa.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Charts */}
                <div className="mb-8">
                    <Visualizations subjects={subjects} config={config} t={t} />
                </div>

                {/* Actions */}
                <div className="flex justify-center pt-8 border-t border-slate-100 no-print">
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-3 px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-full font-bold transition-all border-2 border-slate-200 hover:border-[#006a4e] group shadow-sm cursor-pointer"
                    >
                        <svg className="w-5 h-5 text-[#f42a41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t ? t('btn_download') : 'Download Official Grade Sheet'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultDisplay;
