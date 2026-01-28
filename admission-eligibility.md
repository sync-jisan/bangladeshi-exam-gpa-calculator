# 🎓 Admission Eligibility Feature Documentation

This document explains the technical logic and functionality of the **Admission Eligibility Tracker** integrated into the Bangladeshi Exam GPA Calculator.

---

## 🚀 How It Works

The Admission Tracker is a real-time analysis engine that compares a student's calculated GPA and Exam Configuration (Group) against the historical minimum requirements for top educational institutions in Bangladesh.

### Core Logic Workflow:
1.  **Initial State**: The tracker displays a "Waiting" state until the user inputs marks and clicks "Calculate GPA".
2.  **Fail-Safe Check**: If a student receives an **'F' grade** in any mandatory subject, they are immediately marked as **Ineligible** for all higher education tracks.
3.  **Group Validation**: Certain tracks (like Medical and Engineering) are restricted to the **Science** group. If a user selects "Humanities" or "Business", these tracks will be disabled.
4.  **Threshold Comparison**: The system compares the calculated GPA against a database of institutional thresholds.

---

## 📊 Status Definitions

The tracker uses four distinct emotional UI states to communicate chances:

| Status | Condition | Meaning |
| :--- | :--- | :--- |
| **High Chance** | `GPA >= Required` | Student meets or exceeds the traditional cutoff. |
| **Competitive** | `GPA >= (Required - 0.50)` | Student is close to the threshold and has a fair chance in different units. |
| **Unlikely** | `GPA < (Competitive Range)` | Student is significantly below the typical requirement. |
| **Ineligible** | `Has Fail` or `Wrong Group` | Strategic mismatch or failing grade detected. |

---

## 🏫 Institutional Benchmarks

Currently, the tracker monitors four major education paths:

### 1. Medical College
- **Minimum GPA**: 5.00
- **Requirement**: Must be from the **Science** group.
- **Logic**: Primary focus on Biology and Chemistry marks.

### 2. Engineering (BUET / CKRUET)
- **Minimum GPA**: 4.80
- **Requirement**: Must be from the **Science** group.
- **Note**: While 4.80 is the floor for application, top-tier engineering often requires 5.00 in Physics, Chemistry, and Higher Math.

### 3. Public University (General)
- **Minimum GPA**: 4.00
- **Requirement**: Open to all groups (Science, Arts, Commerce).

### 4. National University / Colleges
- **Minimum GPA**: 2.50
- **Requirement**: Entry-level threshold for most degree colleges.

---

## 📝 Examples

### Example A: The Science Topper
- **Group**: Science
- **GPA**: 5.00
- **Result**: 
  - ✅ **Medical**: High Chance
  - ✅ **Engineering**: High Chance
  - ✅ **Public Univ**: High Chance

### Example B: The Humanities Student
- **Group**: Humanities
- **GPA**: 4.60
- **Result**:
  - ❌ **Medical**: Ineligible (Wrong Group)
  - ❌ **Engineering**: Ineligible (Wrong Group)
  - ✅ **Public Univ**: High Chance (Threshold: 4.00)
  - ✅ **National Univ**: High Chance

### Example C: Competitive Science Student
- **Group**: Science
- **GPA**: 4.40
- **Result**:
  - ⚠️ **Medical**: Competitive (Threshold: 5.00)
  - ⚠️ **Engineering**: Competitive (Threshold: 4.80)
  - ✅ **Public Univ**: High Chance

### Example D: Specific Subject Failure
- **Group**: Science
- **GPA**: 3.50 (but has 1 'F' in Math)
- **Result**:
  - 🛑 **All Tracks**: Ineligible (Has Fail)

---

> [!NOTE]
> This tracker provides **estimates** based on general historical data. Official admission circulars from specific universities should always be consulted for the latest requirements.
