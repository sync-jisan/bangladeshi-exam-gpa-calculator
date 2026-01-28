
export const SUBJECT_LISTS = {
    SSC: {
        science: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'Mathematics', required: true },
            { name: 'Physics', required: true },
            { name: 'Chemistry', required: true },
            { name: 'Biology', required: true },
            { name: 'Higher Math', required: false, isOptional: true },
            { name: 'BGS', required: true },
            { name: 'Religion', required: true },
            { name: 'ICT', required: true }
        ],
        business: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'Mathematics', required: true },
            { name: 'Accounting', required: true },
            { name: 'Finance & Banking', required: true },
            { name: 'Business Ent.', required: true },
            { name: 'Science', required: true },
            { name: 'Agri. Studies', required: false, isOptional: true },
            { name: 'Religion', required: true },
            { name: 'ICT', required: true }
        ],
        humanities: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'Mathematics', required: true },
            { name: 'Geography', required: true },
            { name: 'History', required: true },
            { name: 'Civics', required: true },
            { name: 'Economics', required: false, isOptional: true },
            { name: 'Science', required: true },
            { name: 'Religion', required: true },
            { name: 'ICT', required: true }
        ]
    },
    'SSC_2022-23': {
        science: [
            { name: 'Physics', required: true },
            { name: 'Chemistry', required: true },
            { name: 'Biology', required: true }
        ],
        business: [
            { name: 'Accounting', required: true },
            { name: 'Finance & Banking', required: true },
            { name: 'Business Ent.', required: true }
        ],
        humanities: [
            { name: 'History', required: true },
            { name: 'Geography', required: true },
            { name: 'Civics', required: true }
        ]
    },
    JSC: {
        general: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'Mathematics', required: true },
            { name: 'Science', required: true },
            { name: 'BGS', required: true },
            { name: 'Religion', required: true },
            { name: 'ICT', required: true }
        ]
    },
    HSC: {
        science: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'ICT', required: true },
            { name: 'Physics', required: true },
            { name: 'Chemistry', required: true },
            { name: 'Biology', required: true },
            { name: 'Higher Math', required: false, isOptional: true }
        ],
        business: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'ICT', required: true },
            { name: 'Accounting', required: true },
            { name: 'Business Org.', required: true },
            { name: 'Finance & Banking', required: true },
            { name: 'Economics/Agri', required: false, isOptional: true }
        ],
        humanities: [
            { name: 'Bangla', required: true },
            { name: 'English', required: true },
            { name: 'ICT', required: true },
            { name: 'Economics', required: true },
            { name: 'Civics', required: true },
            { name: 'Logic', required: true },
            { name: 'Geography/Social', required: false, isOptional: true }
        ]
    }
};
