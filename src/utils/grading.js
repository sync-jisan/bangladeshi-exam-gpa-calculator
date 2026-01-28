// Grading System Configuration for Bangladesh
export const GRADING_SCALE = [
    { min: 80, max: 100, point: 5.00, grade: 'A+' },
    { min: 70, max: 79, point: 4.00, grade: 'A' },
    { min: 60, max: 69, point: 3.50, grade: 'A-' },
    { min: 50, max: 59, point: 3.00, grade: 'B' },
    { min: 40, max: 49, point: 2.00, grade: 'C' },
    { min: 33, max: 39, point: 1.00, grade: 'D' },
    { min: 0, max: 32, point: 0.00, grade: 'F' }
];

/**
 * Get grade info based on marks
 * @param {number} marks - Student marks (0-100)
 * @returns {Object} - { point, grade }
 */
export const getGrade = (marks) => {
    if (marks === '' || marks === null || marks === undefined || isNaN(marks)) {
        return { point: 0, grade: '-' };
    }

    const m = parseFloat(marks);
    const result = GRADING_SCALE.find(scale => m >= scale.min && m <= scale.max);
    return result ? { point: result.point, grade: result.grade } : { point: 0, grade: 'F' };
};

/**
 * Calculate total GPA
 * @param {Array} subjects - Array of subject objects
 * @returns {Object} - { gpa, hasFail, gradeLetter }
 */
export const calculateGPA = (subjects) => {
    let totalPoints = 0;
    let totalSubjects = 0;
    let hasFail = false;

    const compulsorySubjects = subjects.filter(s => !s.isOptional);
    const optionalSubjects = subjects.filter(s => s.isOptional);

    // Process compulsory subjects
    compulsorySubjects.forEach(sub => {
        if (!sub.marks && sub.marks !== 0) return; // Skip empty
        const { point, grade } = getGrade(sub.marks);
        if (grade === 'F') hasFail = true;
        totalPoints += point;
        totalSubjects++;
    });

    // Process optional subjects (only add points above 2.00)
    optionalSubjects.forEach(sub => {
        if (!sub.marks && sub.marks !== 0) return; // Skip empty
        const { point } = getGrade(sub.marks);
        if (point > 2.00) {
            totalPoints += (point - 2.00);
        }
    });

    let gpa = 0.00;
    if (hasFail || totalSubjects === 0) {
        gpa = 0.00;
    } else {
        gpa = totalPoints / totalSubjects;
        if (gpa > 5.00) gpa = 5.00;
    }

    // Get grade letter
    let gradeLetter = 'F';
    if (hasFail) {
        gradeLetter = 'F';
    } else if (gpa === 5.00) {
        gradeLetter = 'Golden A+';
    } else if (gpa >= 4.00) {
        gradeLetter = 'A+';
    } else if (gpa >= 3.50) {
        gradeLetter = 'A';
    } else if (gpa >= 3.00) {
        gradeLetter = 'A-';
    } else if (gpa >= 2.00) {
        gradeLetter = 'B';
    } else if (gpa >= 1.00) {
        gradeLetter = 'C';
    } else {
        gradeLetter = 'F';
    }

    return { gpa: parseFloat(gpa.toFixed(2)), hasFail, gradeLetter };
};
