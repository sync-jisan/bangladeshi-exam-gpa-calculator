import { useLocalStorage } from './useLocalStorage';
import { calculateOfficialGPA } from '../utils/ssc_calculator';
import { SUBJECT_LISTS } from '../utils/ssc_subjects';

/**
 * Custom hook to manage GPA calculator state and logic
 */
export const useGPACalculator = (initialExamType = 'SSC') => {
    // Configuration State
    const [config, setConfig] = useLocalStorage(`bd_gpa_config_${initialExamType.toLowerCase()}`, {
        examType: initialExamType,
        year: 'standard', // 'standard' or '2022-23'
        group: initialExamType === 'JSC' ? 'general' : 'science' // 'science', 'business', 'humanities' or 'general'
    });

    // Derived config to ensure validity without mutating state
    const currentConfig = {
        ...config,
        examType: config.examType || initialExamType,
        group: config.group === 'commerce' ? 'business' : (config.group || (initialExamType === 'JSC' ? 'general' : 'science'))
    };

    // Default subjects based on initial config
    const getInitialSubjects = () => {
        const c = currentConfig;
        const examPrefix = c.examType === 'SSC' && c.year === '2022-23' ? 'SSC_2022-23' : c.examType;
        const list = SUBJECT_LISTS[examPrefix]?.[c.group] || [];

        if (list.length > 0) {
            return list.map((s, i) => ({
                id: `subject-initial-${i}`,
                name: s.name,
                marks: '',
                isOptional: s.isOptional || false,
                required: s.required || false
            }));
        }

        // Fallback default
        return Array.from({ length: 6 }, (_, i) => ({
            id: `subject-default-${i}`,
            name: `Subject ${i + 1}`,
            marks: '',
            isOptional: false
        }));
    };

    const [subjects, setSubjects] = useLocalStorage(`bd_gpa_subjects_${initialExamType.toLowerCase()}`, getInitialSubjects);

    // Update subjects when config changes
    const loadSubjectsFromConfig = (newConfig) => {
        const c = newConfig || currentConfig;
        const examPrefix = c.examType === 'SSC' && c.year === '2022-23' ? 'SSC_2022-23' : c.examType;
        const list = SUBJECT_LISTS[examPrefix]?.[c.group] || [];

        const mappedSubjects = list.map((s, i) => ({
            id: `auto-${Date.now()}-${Math.random().toString(36).substr(2, 5)}-${i}`,
            name: s.name,
            marks: '',
            isOptional: s.isOptional || false,
            required: s.required || false
        }));

        setSubjects(mappedSubjects);
    };

    const updateConfig = (key, value) => {
        const newConfig = { ...currentConfig, [key]: value };
        setConfig(newConfig);
        // Optionally auto-reload subjects? Let's make it a separate action for UX safety
        // But for "Group" change, users usually expect subjects to change.
        if (key === 'group' || key === 'year') {
            loadSubjectsFromConfig(newConfig);
        }
    };

    const addSubject = () => {
        if (subjects.length >= 15) {
            alert('Maximum 15 subjects allowed');
            return;
        }
        const newSubject = {
            id: `subject-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: `Subject ${subjects.length + 1}`,
            marks: '',
            isOptional: false
        };
        setSubjects([...subjects, newSubject]);
    };

    const removeSubject = (id) => {
        if (subjects.length <= 1) {
            alert('You must have at least one subject');
            return;
        }
        setSubjects(subjects.filter(sub => sub.id !== id));
    };

    const updateSubject = (id, field, value) => {
        setSubjects(subjects.map(sub => {
            if (sub.id === id) {
                if (field === 'marks') {
                    let val = parseFloat(value);
                    if (val > 100) val = 100; // Hard clamp for UI (grading logic handles 50 mark scale)
                    if (val < 0) val = 0;
                    return { ...sub, marks: isNaN(val) ? '' : val };
                }
                return { ...sub, [field]: value };
            }
            return sub;
        }));
    };

    const resetCalculator = () => {
        if (window.confirm('Are you sure you want to clear all data?')) {
            loadSubjectsFromConfig();
        }
    };

    const result = calculateOfficialGPA(subjects, currentConfig);

    return {
        subjects,
        config: currentConfig,
        updateConfig,
        addSubject,
        removeSubject,
        updateSubject,
        resetCalculator,
        result
    };
};
