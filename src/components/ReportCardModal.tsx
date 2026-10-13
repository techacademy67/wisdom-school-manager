import { Student, Grade } from '../types/school';

interface Props {
  student: Student | null;
  grades: Grade[];
  onClose: () => void;
}

export default function ReportCardModal({ student, grades, onClose }: Props) {
  if (!student) return null;

  const studentGrades = grades.filter((g) => g.studentId === student.id);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Report Card - {student.name}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-sm text-slate-400 mb-4">Roll: {student.rollNumber} • Class: {student.classId}</p>
        
        {studentGrades.length === 0 ? (
          <p className="text-slate-500">No grades recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800">
                <th className="py-2">Subject</th>
                <th>Term</th>
                <th>Exam</th>
                <th>Assignment</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((g) => (
                <tr key={g.id} className="border-b border-slate-800/50">
                  <td className="py-2">{g.subject}</td>
                  <td>{g.term}</td>
                  <td>{g.examScore}</td>
                  <td>{g.assignmentScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
