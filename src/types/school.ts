export type PortalRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface UserAccount {
  id: string;
  username: string; // email or roll number or username
  email: string;
  password: string;
  role: PortalRole;
  linkedId?: string; // linked studentId or teacherId
  name: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  classId: string; // e.g. "grade-10-a"
  section: string; // e.g. "A"
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  photoUrl?: string;
  enrollmentDate: string;
  medicalInfo?: string;
  emergencyContact?: string;
}

export interface AssignedSubject {
  classId: string;
  subjectName: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  classes: string[]; // array of classIds
  isClassTeacherFor?: string; // ClassId e.g. "grade-10-a" (Homeroom Teacher assignment)
  assignedSubjects?: AssignedSubject[]; // Specific class-subject assignments
  photoUrl?: string;
  dateJoined: string;
  qualification?: string;
}

export interface ClassSection {
  id: string;
  name: string; // e.g. "Grade 10-A"
  room: string;
  teacherId: string; // Form / Class Teacher ID
  schedule: SchedulePeriod[];
}

export interface SchedulePeriod {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string; // e.g. "09:00 AM - 10:00 AM"
  subject: string;
  teacherId: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  term: 'Midterm' | 'Finals';
  examScore: number; // 0-100
  assignmentScore: number; // 0-100
  attendanceScore: number; // 0-10
  feedback: string;
  dateEntered: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late';
  recordedByTeacherId?: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  title: string;
  type: 'Tuition' | 'Admission' | 'Activity' | 'Exam' | 'Transport';
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentDate?: string;
  paymentMethod?: string;
}

export interface LessonPlan {
  id: string;
  teacherId: string;
  classId: string;
  subject: string;
  topic: string;
  date: string; // YYYY-MM-DD
  status: 'Upcoming' | 'Active' | 'Completed';
  objective: string;
  resources: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  category: 'Academics' | 'Administrative' | 'Events' | 'Sports' | 'Urgent';
  author: string;
  targetGroup?: 'All' | 'Faculty' | 'Parents' | 'Students' | 'Grade 10-A' | 'Grade 9-B' | 'Grade 11-C';
}

export interface ChatMessage {
  id: string;
  sender: 'parent' | 'teacher';
  parentId: string;
  teacherId: string;
  studentId: string;
  text: string;
  timestamp: string;
}

export interface ExamRoutine {
  id: string;
  classId: string;
  subject: string;
  examName: string;
  date: string; // YYYY-MM-DD
  time: string;
  room: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';
  submittedByTeacherId?: string;
  adminFeedback?: string;
}

export interface SyllabusItem {
  id: string;
  classId: string;
  subject: string;
  title: string;
  description: string;
  bookList: string[];
  pdfUrl?: string;
  updatedDate: string;
}

export interface QuestionBankItem {
  id: string;
  teacherId: string;
  classId: string;
  subject: string;
  examType: string;
  title: string;
  questions: string[];
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';
  adminFeedback?: string;
  dateCreated: string;
}

export interface Meeting {
  id: string;
  type: 'Student' | 'Teacher' | 'Guardian';
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  organizerId: string;
  organizerName: string;
  minutes?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface TeacherLeaveRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  substituteTeacherId?: string;
  substituteTeacherName?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
}

export interface ResultCardApproval {
  id: string;
  classId: string;
  term: 'Midterm' | 'Finals';
  submittedByTeacherId: string;
  submittedByTeacherName: string;
  status: 'Draft' | 'Pending Approval' | 'Published' | 'Rejected';
  adminNotes?: string;
  dateSubmitted: string;
}
