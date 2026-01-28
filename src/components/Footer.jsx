import { Link } from 'react-router-dom';

const Footer = ({ t }) => {
    return (
        <footer className="mt-12 border-t-8 border-[#f42a41] bg-[#004d39] pt-16 pb-12 text-center md:text-left no-print">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 px-6">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <img
                            src="/bd-calcu-whitecolor.png"
                            alt="Bangladeshi GPA Calculator"
                            className="h-24 md:h-28 w-auto object-contain"
                        />
                    </div>
                    <p className="text-emerald-100/80 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 md:pl-8 md:text-left">
                        {t ? t('footer_desc') : 'The official-standard GPA calculation tool for Bangladeshi students (SSC/HSC). Trusted, fast, and accurate.'}
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider" style={{ color: 'white' }}>
                        {t ? t('footer_resources') : 'Resources'}
                    </h4>
                    <ul className="space-y-2 text-sm text-emerald-100/70">
                        <li><a href="#grading-system" className="hover:text-white transition-colors font-medium">{t ? t('footer_grading_sys') : 'Grading System'}</a></li>
                        <li><a href="https://nctb.gov.bd/" className="hover:text-white transition-colors font-medium">{t ? t('footer_mark_dist') : 'Mark Distribution'}</a></li>
                        <li><a href="http://www.educationboardresults.gov.bd/" className="hover:text-white transition-colors font-medium">{t ? t('footer_board_results') : 'Board Results'}</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider" style={{ color: 'white' }}>
                        {t ? t('footer_legal') : 'Legal'}
                    </h4>
                    <ul className="space-y-2 text-sm text-emerald-100/70">
                        <li><Link to="/privacy" className="hover:text-white transition-colors">{t ? t('footer_privacy') : 'Privacy Policy'}</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition-colors">{t ? t('footer_terms') : 'Terms of Service'}</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">{t ? t('footer_contact') : 'Contact Support'}</Link></li>
                    </ul>
                </div>
            </div>

            <div className="pt-6 border-t border-emerald-800 text-center">
                <p className="text-xs text-emerald-100/60 font-medium tracking-wide">
                    {t ? t('footer_copyright_1') : '©'} {new Date().getFullYear()} {t ? t('footer_copyright_2') : 'Bangladeshi GPA Calculator. All rights reserved. | Dedicated to Academic Excellence.'}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
