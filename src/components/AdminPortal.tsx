import { useState, useEffect } from 'react';
import { UserAccount, Student, Teacher, ClassSection, Grade, Attendance, Invoice, Announcement } from '../types/school';
import { SchoolDB } from '../data/db';
import StatsDashboard from './StatsDashboard';
import { LogOut, Users, GraduationCap, BookOpen, DollarSign, Megaphone, Settings, BarChart3 } from 'lucide-react';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

type Tab = 'dashboard' | 'students' | 'teachers' | 'classes' | 'finance' | 'announcements' | 'settings';

export default function AdminPortal({ user, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassSection[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    setStudents(SchoolDB.getStudents());
    setTeachers(SchoolDB.getTeachers());
    setClasses(SchoolDB.getClasses());
    setGrades(SchoolDB.getGrades());
    setAttendance(SchoolDB.getAttendance());
    setInvoices(SchoolDB.getInvoices());
    setAnnouncements(SchoolDB.getAnnouncements());
  }, []);

  const menu = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: BarChart3 },
    { id: 'students' as Tab, label: 'Students', icon: Users },
    { id: 'teachers' as Tab, label: 'Teachers', icon: GraduationCap },
    { id: 'classes' as Tab, label: 'Classes', icon: BookOpen },
    { id: 'finance' as Tab, label: 'Finance', icon: DollarSign },
    { id: 'announcements' as Tab, label: 'Announcements', icon: Megaphone },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-5 border-b border-slate-800">
          <h1 className="font-bold text-lg">Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">{user.name}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                tab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-950/50"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {tab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <StatsDashboard
              students={students}
              teachers={teachers}
              classes={classes}
              grades={grades}
              attendance={attendance}
              invoices={invoices}
            />
          </div>
        )}

        {tab === 'students' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Students ({students.length})</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/50 text-slate-400">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Roll</th>
                    <th className="text-left p-3">Class</th>
                    <th className="text-left p-3">Parent</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-slate-500">No students yet. Data will appear after mockData is loaded.</td></tr>
                  ) : students.map((s) => (
                    <tr key={s.id} className="border-t border-slate-800">
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.rollNumber}</td>
                      <td className="p-3">{s.classId}</td>
                      <td className="p-3">{s.parentName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'teachers' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Teachers ({teachers.length})</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">
              Teacher management panel. Full features available after full component upload.
            </div>
          </div>
        )}

        {tab === 'classes' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Classes ({classes.length})</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">
              Class management panel.
            </div>
          </div>
        )}

        {tab === 'finance' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Finance</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">
              Invoices & payments panel.
            </div>
          </div>
        )}

        {tab === 'announcements' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Announcements</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">
              School announcements panel.
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <button
              onClick={() => SchoolDB.resetDB()}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm"
            >
              Reset Demo Data
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
