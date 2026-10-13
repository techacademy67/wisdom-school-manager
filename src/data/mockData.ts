import { Student, Teacher, ClassSection, Grade, Attendance, Invoice, LessonPlan, Announcement, ChatMessage, ExamRoutine, SyllabusItem, QuestionBankItem, Meeting, TeacherLeaveRequest, AuditLog, ResultCardApproval } from '../types/school';

export const mockStudents: Student[] = [
  {
    id: 'stud-1',
    name: 'Alexander Mercer',
    rollNumber: 'WA-2026-001',
    classId: 'grade-10-a',
    section: 'A',
    parentName: 'Richard Mercer',
    parentEmail: 'richmercer@gmail.com',
    parentPhone: '+8801711000001',
    enrollmentDate: '2024-01-15',
  },
  {
    id: 'stud-2',
    name: 'Charlotte Vance',
    rollNumber: 'WA-2026-002',
    classId: 'grade-10-a',
    section: 'A',
    parentName: 'Kazi Rahman',
    parentEmail: 'kazi@rahman.edu',
    parentPhone: '+8801711000002',
    enrollmentDate: '2024-01-15',
  },
  {
    id: 'stud-3',
    name: 'Olivia Khan',
    rollNumber: 'WA-2026-003',
    classId: 'grade-9-b',
    section: 'B',
    parentName: 'Farhana Khan',
    parentEmail: 'farhana@email.com',
    parentPhone: '+8801711000003',
    enrollmentDate: '2024-02-01',
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: 'teach-1',
    name: 'David Miller',
    email: 'david.miller@wisdom-school.edu',
    phone: '+8801811000001',
    subject: 'Mathematics',
    classes: ['grade-10-a', 'grade-9-b'],
    isClassTeacherFor: 'grade-10-a',
    dateJoined: '2020-03-01',
    qualification: 'M.Sc Mathematics',
  },
  {
    id: 'teach-2',
    name: 'Ms. Sarah Rahman',
    email: 'sarah.rahman@wisdom-school.edu',
    phone: '+8801811000002',
    subject: 'English',
    classes: ['grade-10-a'],
    dateJoined: '2021-06-15',
    qualification: 'MA English Literature',
  },
];

export const mockClasses: ClassSection[] = [
  {
    id: 'grade-10-a',
    name: 'Grade 10-A',
    room: 'Room 201',
    teacherId: 'teach-1',
    schedule: [
      { day: 'Monday', time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacherId: 'teach-1' },
      { day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'English', teacherId: 'teach-2' },
      { day: 'Tuesday', time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacherId: 'teach-1' },
    ],
  },
  {
    id: 'grade-9-b',
    name: 'Grade 9-B',
    room: 'Room 105',
    teacherId: 'teach-1',
    schedule: [
      { day: 'Wednesday', time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacherId: 'teach-1' },
    ],
  },
];

export const mockGrades: Grade[] = [
  {
    id: 'grade-1',
    studentId: 'stud-1',
    subject: 'Mathematics',
    term: 'Midterm',
    examScore: 88,
    assignmentScore: 92,
    attendanceScore: 9,
    feedback: 'Excellent performance',
    dateEntered: '2026-03-15',
  },
  {
    id: 'grade-2',
    studentId: 'stud-1',
    subject: 'English',
    term: 'Midterm',
    examScore: 85,
    assignmentScore: 90,
    attendanceScore: 10,
    feedback: 'Very good',
    dateEntered: '2026-03-16',
  },
  {
    id: 'grade-3',
    studentId: 'stud-2',
    subject: 'Mathematics',
    term: 'Midterm',
    examScore: 78,
    assignmentScore: 82,
    attendanceScore: 8,
    feedback: 'Good effort',
    dateEntered: '2026-03-15',
  },
];

export const mockAttendance: Attendance[] = [
  { id: 'att-1', studentId: 'stud-1', date: '2026-03-10', status: 'present' },
  { id: 'att-2', studentId: 'stud-1', date: '2026-03-11', status: 'present' },
  { id: 'att-3', studentId: 'stud-2', date: '2026-03-10', status: 'late' },
  { id: 'att-4', studentId: 'stud-2', date: '2026-03-11', status: 'present' },
  { id: 'att-5', studentId: 'stud-3', date: '2026-03-10', status: 'absent' },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    studentId: 'stud-1',
    title: 'Tuition Fee - March 2026',
    type: 'Tuition',
    amount: 15000,
    dueDate: '2026-03-10',
    status: 'Paid',
    paymentDate: '2026-03-05',
    paymentMethod: 'bKash',
  },
  {
    id: 'inv-2',
    studentId: 'stud-2',
    title: 'Tuition Fee - March 2026',
    type: 'Tuition',
    amount: 15000,
    dueDate: '2026-03-10',
    status: 'Unpaid',
  },
];

export const mockLessonPlans: LessonPlan[] = [
  {
    id: 'lp-1',
    teacherId: 'teach-1',
    classId: 'grade-10-a',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    date: '2026-03-20',
    status: 'Upcoming',
    objective: 'Understand and solve quadratic equations',
    resources: 'Textbook Chapter 5, Worksheets',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Midterm Exam Schedule Released',
    content: 'The midterm examination schedule for all classes has been published. Please check the notice board.',
    date: '2026-03-01',
    category: 'Academics',
    author: 'Sarah Jenkins (Principal)',
    targetGroup: 'All',
  },
  {
    id: 'ann-2',
    title: 'Sports Day 2026',
    content: 'Annual Sports Day will be held on 25th March. All students are encouraged to participate.',
    date: '2026-03-05',
    category: 'Events',
    author: 'Admin',
    targetGroup: 'All',
  },
];

export const mockMessages: ChatMessage[] = [];
export const mockExamRoutines: ExamRoutine[] = [];
export const mockSyllabusItems: SyllabusItem[] = [];
export const mockQuestionBank: QuestionBankItem[] = [];
export const mockMeetings: Meeting[] = [];
export const mockLeaveRequests: TeacherLeaveRequest[] = [];
export const mockAuditLogs: AuditLog[] = [];
export const mockResultApprovals: ResultCardApproval[] = [];
