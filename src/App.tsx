import { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  HelpCircle, 
  RotateCcw, 
  Bell, 
  MessageSquare,
  Lock, 
  Clock, 
  Sparkles,
  Info,
  CheckCircle
} from 'lucide-react';
import { PortalRole, Student, Teacher, ClassSection, Grade, Attendance, Invoice, LessonPlan, Announcement, ChatMessage, UserAccount } from './types/school';
import { SchoolDB } from './data/db';

// Import portals
import AdminPortal from './components/AdminPortal';
import TeacherPortal from './components/TeacherPortal';
import StudentPortal from './components/StudentPortal';
import ParentPortal from './components/ParentPortal';
import SchoolWebsite from './components/SchoolWebsite';

export default function App() {
  const [role, setRole] = useState<PortalRole | 'website' | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Seed data on first load
    SchoolDB.getUsers();
  }, []);

  const handleLogin = () => {
    const found = SchoolDB.authenticateUser(loginId, loginPass);
    if (found) {
      setUser(found);
      setRole(found.role);
      setShowLogin(false);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    setLoginId('');
    setLoginPass('');
  };

  if (role === 'admin' && user) {
    return <AdminPortal user={user} onLogout={handleLogout} />;
  }
  if (role === 'teacher' && user) {
    return <TeacherPortal user={user} onLogout={handleLogout} />;
  }
  if (role === 'student' && user) {
    return <StudentPortal user={user} onLogout={handleLogout} />;
  }
  if (role === 'parent' && user) {
    return <ParentPortal user={user} onLogout={handleLogout} />;
  }
  if (role === 'website') {
    return <SchoolWebsite onBack={() => setRole(null)} />;
  }

  // Landing / Login screen
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Wisdom School Manager</h1>
            <p className="text-xs text-slate-400">Complete School Management System</p>
          </div>
        </div>
        <button
          onClick={() => setShowLogin(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition"
        >
          Staff Login
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-6">
          <Sparkles className="w-16 h-16 text-indigo-400 mx-auto" />
          <h2 className="text-4xl font-bold">Welcome to Wisdom Academy</h2>
          <p className="text-slate-400 text-lg">
            A full-featured school management platform with portals for Admin, Teachers, Students and Parents.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {(['admin', 'teacher', 'student', 'parent'] as PortalRole[]).map((r) => (
              <button
                key={r}
                onClick={() => { setShowLogin(true); setLoginId(r === 'admin' ? 'admin' : ''); }}
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500 transition text-left"
              >
                <div className="font-semibold capitalize">{r}</div>
                <div className="text-xs text-slate-500 mt-1">Portal access</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setRole('website')}
            className="mt-6 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm"
          >
            View Public School Website
          </button>
        </div>
      </main>

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Lock className="w-5 h-5" /> Login
            </h3>
            <input
              type="text"
              placeholder="Username / Email / Roll"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg outline-none focus:border-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg outline-none focus:border-indigo-500"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Demo: admin / admin123 · teacher123 · student123 · parent123
            </p>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Wisdom School Manager • LocalStorage demo • Not for production data
      </footer>
    </div>
  );
}
