
export const EXAM_CONFIG = {
    SSC: {
        years: [
            { id: 'standard', label: 'Standard (All Years)' },
            { id: '2022-23', label: '2022-2023 (Short Syllabus)' }
        ],
        groups: [
            { id: 'science', label: 'Science' },
            { id: 'business', label: 'Business Studies' },
            { id: 'humanities', label: 'Humanities (Arts)' }
        ]
    },
    JSC: {
        years: [{ id: 'standard', label: 'Standard' }],
        groups: [{ id: 'general', label: 'General' }]
    },
    HSC: {
        years: [{ id: 'standard', label: 'Standard' }],
        groups: [
            { id: 'science', label: 'Science' },
            { id: 'business', label: 'Business Studies' },
            { id: 'humanities', label: 'Humanities (Arts)' }
        ]
    }
};

export const GRADING_SCALES = {
    STANDARD: [
        { min: 80, max: 100, point: 5.00, grade: 'A+' },
        { min: 70, max: 79, point: 4.00, grade: 'A' },
        { min: 60, max: 69, point: 3.50, grade: 'A-' },
        { min: 50, max: 59, point: 3.00, grade: 'B' },
        { min: 40, max: 49, point: 2.00, grade: 'C' },
        { min: 33, max: 39, point: 1.00, grade: 'D' },
        { min: 0, max: 32, point: 0.00, grade: 'F' }
    ],
    SPECIAL_50: [
        { min: 40, max: 50, point: 5.00, grade: 'A+' },
        { min: 35, max: 39, point: 4.00, grade: 'A' },
        { min: 30, max: 34, point: 3.50, grade: 'A-' },
        { min: 25, max: 29, point: 3.00, grade: 'B' },
        { min: 20, max: 24, point: 2.00, grade: 'C' },
        { min: 17, max: 19, point: 1.00, grade: 'D' },
        { min: 0, max: 16, point: 0.00, grade: 'F' }
    ]
};
