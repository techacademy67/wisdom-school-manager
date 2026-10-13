import { useState, useEffect } from 'react';
import { UserAccount, Student, Teacher, ClassSection, Grade, Attendance, Invoice, Announcement } from '../types/school';
import { SchoolDB } from '../data/db';
import StatsDashboard from './StatsDashboard';
import { LogOut, Users, GraduationCap, BookOpen, DollarSign, Megaphone, Settings, BarChart3, Plus, Search } from 'lucide-react';

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
  const [search, setSearch] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setStudents(SchoolDB.getStudents());
    setTeachers(SchoolDB.getTeachers());
    setClasses(SchoolDB.getClasses());
    setGrades(SchoolDB.getGrades());
    setAttendance(SchoolDB.getAttendance());
    setInvoices(SchoolDB.getInvoices());
    setAnnouncements(SchoolDB.getAnnouncements());
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

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
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-950/50">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {tab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <StatsDashboard students={students} teachers={teachers} classes={classes} grades={grades} attendance={attendance} invoices={invoices} />
          </div>
        )}

        {tab === 'students' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Students ({students.length})</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/50 text-slate-400">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Roll</th>
                    <th className="text-left p-3">Class</th>
                    <th className="text-left p-3">Parent</th>
                    <th className="text-left p-3">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-slate-500">No students found</td></tr>
                  ) : filteredStudents.map((s) => (
                    <tr key={s.id} className="border-t border-slate-800 hover:bg-slate-800/30">
                      <td className="p-3 font-medium">{s.name}</td>
                      <td className="p-3">{s.rollNumber}</td>
                      <td className="p-3">{s.classId}</td>
                      <td className="p-3">{s.parentName}</td>
                      <td className="p-3 text-slate-400">{s.parentPhone}</td>
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
            <div className="grid gap-4">
              {teachers.map(t => (
                <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-slate-400">{t.subject} • {t.email}</div>
                  </div>
                  <div className="text-xs text-slate-500">{t.classes.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'classes' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Classes ({classes.length})</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {classes.map(c => (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <div className="font-bold text-lg">{c.name}</div>
                  <div className="text-sm text-slate-400 mt-1">Room: {c.room}</div>
                  <div className="mt-3 text-xs text-slate-500">
                    {c.schedule.length} periods scheduled
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'finance' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Finance</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/50 text-slate-400">
                  <tr>
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Due</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id} className="border-t border-slate-800">
                      <td className="p-3">{inv.title}</td>
                      <td className="p-3">৳{inv.amount.toLocaleString()}</td>
                      <td className="p-3">{inv.dueDate}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          inv.status === 'Paid' ? 'bg-emerald-900 text-emerald-300' :
                          inv.status === 'Overdue' ? 'bg-red-900 text-red-300' : 'bg-amber-900 text-amber-300'
                        }`}>{inv.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'announcements' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Announcements</h2>
            <div className="space-y-4">
              {announcements.map(a => (
                <div key={a.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
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

        {tab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-4">
              <button onClick={() => { SchoolDB.resetDB(); }} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">
                Reset All Demo Data
              </button>
              <p className="text-sm text-slate-500">This will clear localStorage and reload the page with default demo data.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
