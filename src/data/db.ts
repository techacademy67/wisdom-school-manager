import { Student, Teacher, ClassSection, Grade, Attendance, Invoice, LessonPlan, Announcement, ChatMessage, UserAccount, ExamRoutine, SyllabusItem, QuestionBankItem, Meeting, TeacherLeaveRequest, AuditLog, ResultCardApproval } from '../types/school';
import { 
  mockStudents, 
  mockTeachers, 
  mockClasses, 
  mockGrades, 
  mockAttendance, 
  mockInvoices, 
  mockLessonPlans, 
  mockAnnouncements, 
  mockMessages,
  mockExamRoutines,
  mockSyllabusItems,
  mockQuestionBank,
  mockMeetings,
  mockLeaveRequests,
  mockAuditLogs,
  mockResultApprovals
} from './mockData';

export const mockUsers: UserAccount[] = [
  {
    id: 'usr-admin-1',
    username: 'admin',
    email: 'admin@wisdom-school.edu',
    password: 'admin123',
    role: 'admin',
    name: 'Sarah Jenkins (Principal)',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-teach-1',
    username: 'david.miller',
    email: 'david.miller@wisdom-school.edu',
    password: 'teacher123',
    role: 'teacher',
    linkedId: 'teach-1',
    name: 'David Miller',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-teach-2',
    username: 'sarah.rahman',
    email: 'sarah.rahman@wisdom-school.edu',
    password: 'teacher123',
    role: 'teacher',
    linkedId: 'teach-2',
    name: 'Ms. Sarah Rahman',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-stud-1',
    username: 'WA-2026-001',
    email: 'alexander@wisdom-school.edu',
    password: 'student123',
    role: 'student',
    linkedId: 'stud-1',
    name: 'Alexander Mercer',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-stud-2',
    username: 'WA-2026-002',
    email: 'charlotte@wisdom-school.edu',
    password: 'student123',
    role: 'student',
    linkedId: 'stud-2',
    name: 'Charlotte Vance',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-parent-1',
    username: 'richmercer@gmail.com',
    email: 'richmercer@gmail.com',
    password: 'parent123',
    role: 'parent',
    linkedId: 'stud-1',
    name: 'Richard Mercer (Parent)',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-parent-2',
    username: 'kazi@rahman.edu',
    email: 'kazi@rahman.edu',
    password: 'parent123',
    role: 'parent',
    linkedId: 'stud-2',
    name: 'Kazi Rahman (Parent)',
    createdAt: '2026-01-01'
  }
];

const KEYS = {
  users: 'wa_school_users',
  students: 'wa_school_students',
  teachers: 'wa_school_teachers',
  classes: 'wa_school_classes',
  grades: 'wa_school_grades',
  attendance: 'wa_school_attendance',
  invoices: 'wa_school_invoices',
  lessonPlans: 'wa_school_lesson_plans',
  announcements: 'wa_school_announcements',
  messages: 'wa_school_messages',
  examRoutines: 'wa_school_exam_routines',
  syllabusItems: 'wa_school_syllabus_items',
  questionBank: 'wa_school_question_bank',
  meetings: 'wa_school_meetings',
  leaveRequests: 'wa_school_leave_requests',
  auditLogs: 'wa_school_audit_logs',
  resultApprovals: 'wa_school_result_approvals',
};

function getStoredData<T>(key: string, defaultData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading key ${key} from localStorage`, err);
    return defaultData;
  }
}

function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving key ${key} to localStorage`, err);
  }
}

export const SchoolDB = {
  getUsers: () => getStoredData<UserAccount[]>(KEYS.users, mockUsers),
  saveUsers: (data: UserAccount[]) => saveStoredData(KEYS.users, data),

  authenticateUser: (identifier: string, pass: string): UserAccount | null => {
    const users = getStoredData<UserAccount[]>(KEYS.users, mockUsers);
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();
    
    return users.find(u => 
      (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) &&
      u.password === cleanPass
    ) || null;
  },

  getStudents: () => getStoredData<Student[]>(KEYS.students, mockStudents),
  saveStudents: (data: Student[]) => saveStoredData(KEYS.students, data),

  getTeachers: () => getStoredData<Teacher[]>(KEYS.teachers, mockTeachers),
  saveTeachers: (data: Teacher[]) => saveStoredData(KEYS.teachers, data),

  getClasses: () => getStoredData<ClassSection[]>(KEYS.classes, mockClasses),
  saveClasses: (data: ClassSection[]) => saveStoredData(KEYS.classes, data),

  getGrades: () => getStoredData<Grade[]>(KEYS.grades, mockGrades),
  saveGrades: (data: Grade[]) => saveStoredData(KEYS.grades, data),

  getAttendance: () => getStoredData<Attendance[]>(KEYS.attendance, mockAttendance),
  saveAttendance: (data: Attendance[]) => saveStoredData(KEYS.attendance, data),

  getInvoices: () => getStoredData<Invoice[]>(KEYS.invoices, mockInvoices),
  saveInvoices: (data: Invoice[]) => saveStoredData(KEYS.invoices, data),

  getLessonPlans: () => getStoredData<LessonPlan[]>(KEYS.lessonPlans, mockLessonPlans),
  saveLessonPlans: (data: LessonPlan[]) => saveStoredData(KEYS.lessonPlans, data),

  getAnnouncements: () => getStoredData<Announcement[]>(KEYS.announcements, mockAnnouncements),
  saveAnnouncements: (data: Announcement[]) => saveStoredData(KEYS.announcements, data),

  getMessages: () => getStoredData<ChatMessage[]>(KEYS.messages, mockMessages),
  saveMessages: (data: ChatMessage[]) => saveStoredData(KEYS.messages, data),

  getExamRoutines: () => getStoredData<ExamRoutine[]>(KEYS.examRoutines, mockExamRoutines),
  saveExamRoutines: (data: ExamRoutine[]) => saveStoredData(KEYS.examRoutines, data),

  getSyllabusItems: () => getStoredData<SyllabusItem[]>(KEYS.syllabusItems, mockSyllabusItems),
  saveSyllabusItems: (data: SyllabusItem[]) => saveStoredData(KEYS.syllabusItems, data),

  getQuestionBank: () => getStoredData<QuestionBankItem[]>(KEYS.questionBank, mockQuestionBank),
  saveQuestionBank: (data: QuestionBankItem[]) => saveStoredData(KEYS.questionBank, data),

  getMeetings: () => getStoredData<Meeting[]>(KEYS.meetings, mockMeetings),
  saveMeetings: (data: Meeting[]) => saveStoredData(KEYS.meetings, data),

  getLeaveRequests: () => getStoredData<TeacherLeaveRequest[]>(KEYS.leaveRequests, mockLeaveRequests),
  saveLeaveRequests: (data: TeacherLeaveRequest[]) => saveStoredData(KEYS.leaveRequests, data),

  getAuditLogs: () => getStoredData<AuditLog[]>(KEYS.auditLogs, mockAuditLogs),
  saveAuditLogs: (data: AuditLog[]) => saveStoredData(KEYS.auditLogs, data),

  addAuditLog: (actorName: string, actorRole: string, action: string, details: string) => {
    const current = getStoredData<AuditLog[]>(KEYS.auditLogs, mockAuditLogs);
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newEntry: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: formattedDate,
      actorName,
      actorRole,
      action,
      details
    };
    saveStoredData(KEYS.auditLogs, [newEntry, ...current]);
  },

  getResultApprovals: () => getStoredData<ResultCardApproval[]>(KEYS.resultApprovals, mockResultApprovals),
  saveResultApprovals: (data: ResultCardApproval[]) => saveStoredData(KEYS.resultApprovals, data),

  exportFullDatabaseJSON: () => {
    const fullDb = {
      users: SchoolDB.getUsers(),
      students: SchoolDB.getStudents(),
      teachers: SchoolDB.getTeachers(),
      classes: SchoolDB.getClasses(),
      grades: SchoolDB.getGrades(),
      attendance: SchoolDB.getAttendance(),
      invoices: SchoolDB.getInvoices(),
      lessonPlans: SchoolDB.getLessonPlans(),
      announcements: SchoolDB.getAnnouncements(),
      messages: SchoolDB.getMessages(),
      examRoutines: SchoolDB.getExamRoutines(),
      syllabusItems: SchoolDB.getSyllabusItems(),
      questionBank: SchoolDB.getQuestionBank(),
      meetings: SchoolDB.getMeetings(),
      leaveRequests: SchoolDB.getLeaveRequests(),
      auditLogs: SchoolDB.getAuditLogs(),
      resultApprovals: SchoolDB.getResultApprovals(),
      settings: (() => {
        try {
          return JSON.parse(localStorage.getItem('wisdom_school_settings') || '{}');
        } catch(e) { return {}; }
      })(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(fullDb, null, 2);
  },

  importFullDatabaseJSON: (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.users) SchoolDB.saveUsers(parsed.users);
      if (parsed.students) SchoolDB.saveStudents(parsed.students);
      if (parsed.teachers) SchoolDB.saveTeachers(parsed.teachers);
      if (parsed.classes) SchoolDB.saveClasses(parsed.classes);
      if (parsed.grades) SchoolDB.saveGrades(parsed.grades);
      if (parsed.attendance) SchoolDB.saveAttendance(parsed.attendance);
      if (parsed.invoices) SchoolDB.saveInvoices(parsed.invoices);
      if (parsed.lessonPlans) SchoolDB.saveLessonPlans(parsed.lessonPlans);
      if (parsed.announcements) SchoolDB.saveAnnouncements(parsed.announcements);
      if (parsed.messages) SchoolDB.saveMessages(parsed.messages);
      if (parsed.examRoutines) SchoolDB.saveExamRoutines(parsed.examRoutines);
      if (parsed.syllabusItems) SchoolDB.saveSyllabusItems(parsed.syllabusItems);
      if (parsed.questionBank) SchoolDB.saveQuestionBank(parsed.questionBank);
      if (parsed.meetings) SchoolDB.saveMeetings(parsed.meetings);
      if (parsed.leaveRequests) SchoolDB.saveLeaveRequests(parsed.leaveRequests);
      if (parsed.auditLogs) SchoolDB.saveAuditLogs(parsed.auditLogs);
      if (parsed.resultApprovals) SchoolDB.saveResultApprovals(parsed.resultApprovals);
      if (parsed.settings) {
        localStorage.setItem('wisdom_school_settings', JSON.stringify(parsed.settings));
      }
      return true;
    } catch(err) {
      console.error('Failed to import DB JSON', err);
      return false;
    }
  },

  resetDB: () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }
};
