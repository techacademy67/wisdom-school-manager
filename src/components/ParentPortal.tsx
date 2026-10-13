import { useState, useEffect } from 'react';
import { UserAccount, Student, Grade, Invoice, Announcement } from '../types/school';
import { SchoolDB } from '../data/db';
import { LogOut, User, DollarSign, Bell, BookOpen } from 'lucide-react';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

export default function ParentPortal({ user, onLogout }: Props) {
  const [child, setChild] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    if (user.linkedId) {
      const students = SchoolDB.getStudents();
      const found = students.find((s) => s.id === user.linkedId) || null;
      setChild(found);
      if (found) {
        setGrades(SchoolDB.getGrades().filter((g) => g.studentId === found.id));
        setInvoices(SchoolDB.getInvoices().filter((i) => i.studentId === found.id));
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Parent Portal</h1>
          <p className="text-xs text-slate-400">{user.name}</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6">
        {child ? (
          <>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">{child.name}</div>
                <div className="text-sm text-slate-400">Roll: {child.rollNumber} • {child.classId}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <BookOpen className="w-5 h-5 text-indigo-400 mb-2" />
                <div className="text-sm text-slate-400">Grades</div>
                <div className="text-xl font-bold">{grades.length}</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <DollarSign className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="text-sm text-slate-400">Invoices</div>
                <div className="text-xl font-bold">{invoices.length}</div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-slate-500">No linked student found.</p>
        )}
      </main>
    </div>
  );
}
