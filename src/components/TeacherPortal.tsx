import { useState, useEffect } from 'react';
import { UserAccount, Student, Grade, Attendance, LessonPlan } from '../types/school';
import { SchoolDB } from '../data/db';
import { LogOut, BookOpen, Users, ClipboardList, Calendar } from 'lucide-react';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

type Tab = 'classes' | 'grades' | 'attendance' | 'lessons';

export default function TeacherPortal({ user, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('classes');
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(SchoolDB.getStudents());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Teacher Portal</h1>
          <p className="text-xs text-slate-400">{user.name}</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="flex">
        <nav className="w-56 border-r border-slate-800 p-4 space-y-1">
          {[
            { id: 'classes' as Tab, label: 'My Classes', icon: BookOpen },
            { id: 'grades' as Tab, label: 'Grades', icon: ClipboardList },
            { id: 'attendance' as Tab, label: 'Attendance', icon: Users },
            { id: 'lessons' as Tab, label: 'Lesson Plans', icon: Calendar },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                tab === item.id ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-6">
          {tab === 'classes' && (
            <div>
              <h2 className="text-xl font-bold mb-4">My Classes</h2>
              <p className="text-slate-400">Students: {students.length}</p>
            </div>
          )}
          {tab === 'grades' && <div><h2 className="text-xl font-bold mb-4">Enter Grades</h2><p className="text-slate-400">Grade entry panel</p></div>}
          {tab === 'attendance' && <div><h2 className="text-xl font-bold mb-4">Attendance</h2><p className="text-slate-400">Mark attendance</p></div>}
          {tab === 'lessons' && <div><h2 className="text-xl font-bold mb-4">Lesson Plans</h2><p className="text-slate-400">Manage lesson plans</p></div>}
        </main>
      </div>
    </div>
  );
}
