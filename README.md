# 🇧🇩 Bangladeshi Exam GPA Calculator (React)

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-19+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.3-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4+-cyan.svg)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-12+-red.svg)

A premium, professional, and fully interactive GPA calculator designed specifically for the Bangladeshi education system (SSC/HSC level). This application features a stunning light-mode UI, smooth animations, and comprehensive educational tools.

---

## 🌟 Key Features

### 🇧🇩 Bilingual Support (English & Bangla)
- Full localization for every UI element.
- Seamless toggle between English and Bangla.
- Native typography support with **Hind Siliguri** font for a professional look.

### 🧮 Smart GPA Calculation
- **Official Logic**: Implements the official NCTB grading system.
- **Optional (4th) Subject**: Intelligent bonus point calculation.
- **Custom Exam Config**: Support for Standard and Short Syllabus (2022-23).
- **SSC/HSC Groups**: Pre-configured subject lists for Science, Humanities, and Business.

### 🎓 Admission Tracker
- Real-time eligibility checking for:
  - Medical Colleges
  - Engineering (BUET/CKRUET)
  - Public Universities
  - National Universities
- Dynamic badges showing admission possibilities based on calculated GPA.

### 📰 Newsletter & Email Integration
- Integrated with **Web3Forms** for real-time user reports.
- Comprehensive email payloads sending GPA info, subject marks, and config details.
- Client-side validation with smooth error handling.

### 🔍 Interactive FAQ & Resources
- **Modern FAQ UI**: Interactive accordion-style FAQ section.
- **Resource Card**: Quick access to official Education Board and Ministry links.
- **Info Articles**: Detailed guides on how the grading system works.

### 📊 Performance Analytics
- Visualized data charts showing marks distribution.
- Official-style Grade Sheet generator for downloading results.

### 📄 Legal & Support Center
- **Privacy First**: Professional Privacy Policy covering AI data usage.
- **Usage Agreements**: Clear Terms of Service matching industry standards.
- **Contact Hub**: Modern, interactive support form with real-time success states.

### 🔐 Source Protection & Security
- **Anti-Inspection**: Integrated security layer to disable Right-Click and Developer Tools (F12, Ctrl+U, etc.).
- **Data Safety**: All academic calculations are processed locally on the client's device.

---

## 🛠 Technology Stack

- **Core**: React 19, Vite 7.3
- **Styling**: Tailwind CSS 4, Vanilla CSS
- **Animations**: Framer Motion 12, GSAP 3
- **Charts**: Recharts
- **Icons**: React Icons (GoArrowUpRight, etc.)
- **Persistence**: LocalStorage for session-saving.

---

## 📂 Project Structure

```
Bangladeshi Exam GPA Calculator/
├── public/                 # Static assets (Logos)
├── src/
│   ├── components/
│   │   ├── AdmissionTracker.jsx    # Real-time eligibility logic
│   │   ├── CardNav.jsx             # Ultra-compact animated navbar
│   │   ├── ChatBot.jsx             # BGC Agent AI floating assistant
│   │   ├── ContactSupport.jsx      # Interactive support hub
│   │   ├── Footer.jsx              # Multilingual professional footer
│   │   ├── GradingChart.jsx        # Reference table for grades
│   │   ├── InfoArticles.jsx        # Guides & Interactive FAQ
│   │   ├── Newsletter.jsx          # Web3Forms subscription system
│   │   ├── PrivacyPolicy.jsx       # Legal & AI data transparency
│   │   ├── ResourceCard.jsx        # Official links container
│   │   ├── ResultDisplay.jsx       # GPA visualization & charts
│   │   ├── SubjectInput.jsx        # Configuration & list management
│   │   ├── SubjectRow.jsx          # Individual mark inputs
│   │   ├── TermsOfService.jsx      # Policy & usage agreement
│   │   └── ValidationPopup.jsx     # Modern error dialogs
│   ├── hooks/
│   │   ├── useGPACalculator.js     # State & Logic orchestration
│   │   └── useLocalStorage.js      # Data persistence logic
│   ├── utils/
│   │   ├── ssc_calculator.js       # Mathematical grading core
│   │   ├── ssc_constants.js        # Official scales & session data
│   │   ├── ssc_subjects.js         # Default subject database
│   │   └── translations.js         # Bilingual dictionary (EN/BN)
│   ├── App.jsx                     # Application Shell
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles & Fonts
└── README.md
```

---

## 🚀 Installation & Development

### 1. Prerequisites
- Node.js (v18+)
- npm / yarn

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/bd-gpa-calculator.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Build
```bash
npm run build
```

---

## 📐 Grading Scale Reference

| Marks Range | Grade | Point |
| :--- | :--- | :--- |
| 80 - 100 | **A+** | 5.00 |
| 70 - 79 | **A** | 4.00 |
| 60 - 69 | **A-** | 3.50 |
| 50 - 59 | **B** | 3.00 |
| 40 - 49 | **C** | 2.00 |
| 33 - 39 | **D** | 1.00 |
| 00 - 32 | **F** | 0.00 |

---

## 📄 License
This project is licensed under the MIT License - feel free to build upon it!

---

**Developed for the Students of Bangladesh 🇧🇩**
