import { useState, useEffect } from 'react';
import { UserAccount, Grade, Attendance, Invoice, Announcement } from '../types/school';
import { SchoolDB } from '../data/db';
import { LogOut, BookOpen, Calendar, DollarSign, Bell } from 'lucide-react';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

export default function StudentPortal({ user, onLogout }: Props) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (user.linkedId) {
      const allGrades = SchoolDB.getGrades();
      setGrades(allGrades.filter((g) => g.studentId === user.linkedId));
    }
    setAnnouncements(SchoolDB.getAnnouncements());
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Student Portal</h1>
          <p className="text-xs text-slate-400">{user.name}</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <BookOpen className="w-5 h-5 text-indigo-400 mb-2" />
            <div className="text-sm text-slate-400">Grades</div>
            <div className="text-xl font-bold">{grades.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <Bell className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-sm text-slate-400">Announcements</div>
            <div className="text-xl font-bold">{announcements.length}</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="font-bold mb-3">My Grades</h2>
          {grades.length === 0 ? (
            <p className="text-slate-500 text-sm">No grades recorded yet.</p>
          ) : (
            <ul className="space-y-2">
              {grades.map((g) => (
                <li key={g.id} className="flex justify-between text-sm border-b border-slate-800 pb-2">
                  <span>{g.subject} ({g.term})</span>
                  <span className="font-medium">{g.examScore}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
