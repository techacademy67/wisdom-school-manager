import { UserAccount } from '../types/school';

interface Props {
  user: UserAccount;
  onLogout: () => void;
}

export default function StudentPortal({ user, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Student Portal</h1>
        <button onClick={onLogout} className="px-4 py-2 bg-red-600 rounded-lg">Logout</button>
      </div>
      <p>Welcome, {user.name}</p>
      <p className="text-slate-400 mt-4">Full StudentPortal component will be uploaded next. This is a placeholder.</p>
    </div>
  );
}
