import { useState, useEffect } from 'react';
import { UserAccount, Student, Grade, Attendance, LessonPlan, ClassSection } from '../types/school';
import { SchoolDB } from '../data/db';
import { LogOut, BookOpen, Users, ClipboardList, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

type Tab = 'classes' | 'grades' | 'attendance' | 'lessons';

export default function TeacherPortal({ user, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('classes');
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassSection[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [lessons, setLessons] = useState<LessonPlan[]>([]);

  useEffect(() => {
    setStudents(SchoolDB.getStudents());
    setClasses(SchoolDB.getClasses());
    setGrades(SchoolDB.getGrades());
    setAttendance(SchoolDB.getAttendance());
    setLessons(SchoolDB.getLessonPlans());
  }, []);

  const myClasses = classes.filter(c => c.teacherId === user.linkedId || true);

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
        <nav className="w-56 border-r border-slate-800 p-4 space-y-1 min-h-[calc(100vh-73px)]">
          {[
            { id: 'classes' as Tab, label: 'My Classes', icon: BookOpen },
            { id: 'grades' as Tab, label: 'Grades', icon: ClipboardList },
            { id: 'attendance' as Tab, label: 'Attendance', icon: Users },
            { id: 'lessons' as Tab, label: 'Lesson Plans', icon: Calendar },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                tab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
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
              <div className="grid md:grid-cols-2 gap-4">
                {myClasses.map(c => (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <div className="font-bold text-lg">{c.name}</div>
                    <div className="text-sm text-slate-400 mt-1">Room: {c.room}</div>
                    <div className="mt-3 space-y-1">
                      {c.schedule.slice(0, 3).map((s, i) => (
                        <div key={i} className="text-xs text-slate-500 flex justify-between">
                          <span>{s.day}</span>
                          <span>{s.time} • {s.subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'grades' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Grades</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800/50 text-slate-400">
                    <tr>
                      <th className="text-left p-3">Student</th>
                      <th className="text-left p-3">Subject</th>
                      <th className="text-left p-3">Term</th>
                      <th className="text-left p-3">Exam</th>
                      <th className="text-left p-3">Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map(g => {
                      const student = students.find(s => s.id === g.studentId);
                      return (
                        <tr key={g.id} className="border-t border-slate-800">
                          <td className="p-3">{student?.name || g.studentId}</td>
                          <td className="p-3">{g.subject}</td>
                          <td className="p-3">{g.term}</td>
                          <td className="p-3">{g.examScore}</td>
                          <td className="p-3">{g.assignmentScore}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'attendance' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Attendance</h2>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800/50 text-slate-400">
                    <tr>
                      <th className="text-left p-3">Student</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map(a => {
                      const student = students.find(s => s.id === a.studentId);
                      return (
                        <tr key={a.id} className="border-t border-slate-800">
                          <td className="p-3">{student?.name || a.studentId}</td>
                          <td className="p-3">{a.date}</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                              a.status === 'present' ? 'bg-emerald-900 text-emerald-300' :
                              a.status === 'late' ? 'bg-amber-900 text-amber-300' : 'bg-red-900 text-red-300'
                            }`}>
                              {a.status === 'present' && <CheckCircle className="w-3 h-3" />}
                              {a.status === 'late' && <Clock className="w-3 h-3" />}
                              {a.status === 'absent' && <XCircle className="w-3 h-3" />}
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'lessons' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Lesson Plans</h2>
              <div className="space-y-4">
                {lessons.map(l => (
                  <div key={l.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">{l.topic}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        l.status === 'Completed' ? 'bg-emerald-900 text-emerald-300' :
                        l.status === 'Active' ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-700 text-slate-300'
                      }`}>{l.status}</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{l.subject} • {l.date}</div>
                    <p className="text-sm text-slate-500 mt-2">{l.objective}</p>
                  </div>
                ))}
                {lessons.length === 0 && <p className="text-slate-500">No lesson plans yet.</p>}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
