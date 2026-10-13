import { useState, useEffect } from 'react';
import { UserAccount, Student, Grade, Attendance, Invoice, Announcement } from '../types/school';
import { SchoolDB } from '../data/db';
import { LogOut, BookOpen, Calendar, DollarSign, Bell, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

type Tab = 'overview' | 'grades' | 'attendance' | 'fees' | 'announcements';

export default function StudentPortal({ user, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const [student, setStudent] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (user.linkedId) {
      const students = SchoolDB.getStudents();
      setStudent(students.find(s => s.id === user.linkedId) || null);
      setGrades(SchoolDB.getGrades().filter(g => g.studentId === user.linkedId));
      setAttendance(SchoolDB.getAttendance().filter(a => a.studentId === user.linkedId));
      setInvoices(SchoolDB.getInvoices().filter(i => i.studentId === user.linkedId));
    }
    setAnnouncements(SchoolDB.getAnnouncements());
  }, [user]);

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendanceRate = attendance.length ? Math.round((presentCount / attendance.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Student Portal</h1>
          <p className="text-xs text-slate-400">{user.name} {student ? `• ${student.rollNumber}` : ''}</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="flex">
        <nav className="w-52 border-r border-slate-800 p-4 space-y-1 min-h-[calc(100vh-73px)]">
          {[
            { id: 'overview' as Tab, label: 'Overview', icon: BookOpen },
            { id: 'grades' as Tab, label: 'Grades', icon: BookOpen },
            { id: 'attendance' as Tab, label: 'Attendance', icon: Calendar },
            { id: 'fees' as Tab, label: 'Fees', icon: DollarSign },
            { id: 'announcements' as Tab, label: 'Notices', icon: Bell },
          ].map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                tab === item.id ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'
              }`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-6">
          {tab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Grades</div>
                  <div className="text-2xl font-bold">{grades.length}</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Attendance</div>
                  <div className="text-2xl font-bold">{attendanceRate}%</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Pending Fees</div>
                  <div className="text-2xl font-bold">{invoices.filter(i => i.status !== 'Paid').length}</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-sm text-slate-400">Notices</div>
                  <div className="text-2xl font-bold">{announcements.length}</div>
                </div>
              </div>
            </div>
          )}

          {tab === 'grades' && (
            <div>
              <h2 className="text-xl font-bold mb-4">My Grades</h2>
              {grades.length === 0 ? <p className="text-slate-500">No grades yet.</p> : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800/50 text-slate-400">
                      <tr>
                        <th className="text-left p-3">Subject</th>
                        <th className="text-left p-3">Term</th>
                        <th className="text-left p-3">Exam</th>
                        <th className="text-left p-3">Assignment</th>
                        <th className="text-left p-3">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map(g => (
                        <tr key={g.id} className="border-t border-slate-800">
                          <td className="p-3 font-medium">{g.subject}</td>
                          <td className="p-3">{g.term}</td>
                          <td className="p-3">{g.examScore}</td>
                          <td className="p-3">{g.assignmentScore}</td>
                          <td className="p-3 text-slate-400">{g.feedback}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === 'attendance' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Attendance ({attendanceRate}%)</h2>
              <div className="space-y-2">
                {attendance.map(a => (
                  <div key={a.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
                    <span>{a.date}</span>
                    <span className={`flex items-center gap-1 text-sm ${
                      a.status === 'present' ? 'text-emerald-400' : a.status === 'late' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {a.status === 'present' && <CheckCircle className="w-4 h-4" />}
                      {a.status === 'late' && <Clock className="w-4 h-4" />}
                      {a.status === 'absent' && <XCircle className="w-4 h-4" />}
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'fees' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Fees & Invoices</h2>
              <div className="space-y-3">
                {invoices.map(inv => (
                  <div key={inv.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{inv.title}</div>
                      <div className="text-sm text-slate-400">Due: {inv.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">৳{inv.amount.toLocaleString()}</div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        inv.status === 'Paid' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                      }`}>{inv.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'announcements' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Announcements</h2>
              <div className="space-y-4">
                {announcements.map(a => (
                  <div key={a.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <div className="flex gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-indigo-900 text-indigo-300 rounded">{a.category}</span>
                      <span className="text-xs text-slate-500">{a.date}</span>
                    </div>
                    <h3 className="font-bold">{a.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{a.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
