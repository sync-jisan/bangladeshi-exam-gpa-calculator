import { GRADING_SCALES } from './ssc_constants';

export const getGradeInfo = (marks, mode = 'standard') => {
    if (marks === '' || marks === null || isNaN(marks)) {
        return { point: 0, grade: '-' };
    }
    const score = parseFloat(marks);
    const scale = mode === '2022-23' ? GRADING_SCALES.SPECIAL_50 : GRADING_SCALES.STANDARD;

    // Find grade
    const result = scale.find(s => score >= s.min && score <= s.max);

    // Default to F if not match (e.g. out of range)
    return result || { point: 0.00, grade: 'F' };
};

export const calculateOfficialGPA = (subjects, config) => {
    const isSpecialYear = config.year === '2022-23';
    let totalPoints = 0;
    let subjectCount = 0;
    let hasFail = false;

    // Filter relevant subjects
    const activeSubjects = subjects.filter(s => s.marks !== '' && !isNaN(s.marks));

    if (activeSubjects.length === 0) {
        return { gpa: 0.00, gradeLetter: '-', hasFail: false };
    }

    // 1. Check Pass/Fail for ALL subjects
    for (let sub of activeSubjects) {
        const { grade, point } = getGradeInfo(sub.marks, config.year);

        if (grade === 'F') {
            hasFail = true;
        }

        // Count points
        if (!isSpecialYear && sub.isOptional) {
            // Standard 4th subject logic: Points > 2.0 are added
            if (point > 2.00) {
                totalPoints += (point - 2.00);
            }
        } else {
            // Main subject (or Special Year subjects which have no extra optional logic)
            totalPoints += point;
            subjectCount++;
        }
    }

    // 2. Calculate Final GPA
    let gpa = 0.00;

    if (hasFail) {
        gpa = 0.00;
    } else if (subjectCount > 0) {
        gpa = totalPoints / subjectCount;
        if (gpa > 5.00) gpa = 5.00;
    }

    // 3. Determine Grade Letter
    let gradeLetter = 'F';
    if (hasFail) {
        gradeLetter = 'F';
    } else if (gpa === 5.00) {
        gradeLetter = 'A+';
    } else if (gpa >= 4.00) gradeLetter = 'A';
    else if (gpa >= 3.50) gradeLetter = 'A-';
    else if (gpa >= 3.00) gradeLetter = 'B';
    else if (gpa >= 2.00) gradeLetter = 'C';
    else if (gpa >= 1.00) gradeLetter = 'D';
    else gradeLetter = 'F';

    return {
        gpa: parseFloat(gpa.toFixed(2)),
        gradeLetter,
        hasFail,
        totalPoints,
        subjectCount
    };
};
