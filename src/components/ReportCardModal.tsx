import { useRef } from 'react';
import { X, Printer, Award, FileSpreadsheet, ShieldAlert, CheckCircle } from 'lucide-react';
import { Student, ClassSection, Grade, Teacher } from '../types/school';

interface ReportCardModalProps {
  student: Student;
  classes: ClassSection[];
  grades: Grade[];
  teachers: Teacher[];
  onClose: () => void;
}

export default function ReportCardModal({
  student,
  classes,
  grades,
  teachers,
  onClose,
}: ReportCardModalProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const className = classes.find((c) => c.id === student.classId)?.name || 'N/A';
  
  const studentGrades = grades.filter((g) => g.studentId === student.id);

  const computeWeightedAverage = (g: Grade) => {
    return Math.round((g.examScore * 0.5) + (g.assignmentScore * 0.4) + (g.attendanceScore * 1.0));
  };

  const getLetterGrade = (score: number) => {
    if (score >= 90) return { char: 'A', color: 'text-emerald-600', badgeClass: 'bg-emerald-50 text-emerald-700' };
    if (score >= 80) return { char: 'B', color: 'text-indigo-600', badgeClass: 'bg-indigo-50 text-indigo-700' };
    if (score >= 70) return { char: 'C', color: 'text-amber-600', badgeClass: 'bg-amber-50 text-amber-700' };
    if (score >= 60) return { char: 'D', color: 'text-violet-600', badgeClass: 'bg-violet-50 text-violet-750' };
    return { char: 'F', color: 'text-rose-600', badgeClass: 'bg-rose-50 text-rose-700' };
  };

  const checkPass = (score: number) => score >= 60;

  const cumulativeAverage = (() => {
    if (studentGrades.length === 0) return 0;
    const totals = studentGrades.map((g) => computeWeightedAverage(g));
    const sum = totals.reduce((a, b) => a + b, 0);
    return Math.round(sum / studentGrades.length);
  })();

  const overallLetter = getLetterGrade(cumulativeAverage);

  const handlePrint = () => {
    const printContent = reportRef.current?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${student.name} - Official Academic Transcript</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@4.0.0/dist/tailwind.min.css">
              <style>
                body { font-family: sans-serif; padding: 40px; background-color: #ffffff; color: #1e293b; }
                @media print {
                  body { padding: 0; margin: 0; }
                  .no-print { display: none !important; }
                }
              </style>
            </head>
            <body>
              <div>${printContent}</div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 flex flex-col my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-3xl">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-800 text-sm tracking-wide">Student Result Card</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrint} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center space-x-1.5 transition-colors">
              <Printer className="w-4 h-4" />
              <span>Print Report Card</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[80vh] bg-slate-50/50" ref={reportRef}>
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-8 max-w-3xl mx-auto border-2 border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-900 pb-6 gap-4 text-center sm:text-left">
              <div className="flex items-center space-x-3.5">
                <div className="w-16 h-16 bg-slate-950 text-amber-400 font-extrabold flex items-center justify-center rounded-2xl shadow-md border-b-4 border-amber-500">
                  <span className="text-3xl font-serif">W</span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-tight leading-none uppercase">Wisdom Bangladesh Academy</h1>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1.5 font-sans">Dhaka Education Division, Bangladesh</p>
                  <p className="text-[10px] text-slate-400">Mirpur, Dhaka, Bangladesh • info@wisdomacademy.edu</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <span className="inline-block px-3 py-1 font-mono text-xs font-extrabold bg-slate-900 text-amber-400 rounded-md tracking-wider uppercase">Exam Result Card</span>
                <p className="text-xs text-slate-500 mt-2 font-semibold">Academic Session: 2026/2027</p>
                <p className="text-[10px] text-slate-400 font-mono">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50/75 rounded-2xl border border-dashed border-slate-205">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Name</span>
                <span className="text-sm font-bold text-slate-800">{student.name}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Roll Number</span>
                <span className="text-sm font-mono text-slate-700 font-bold">#{student.rollNumber}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class & Section</span>
                <span className="text-sm font-medium text-slate-700">{className}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                <span className="text-sm font-semibold flex items-center text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Regular Student
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-slate-900 text-lg font-bold border-b border-slate-100 pb-1.5">Subject-wise Exam Marks</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-350 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-2.5">Subject Name</th>
                      <th className="py-2.5 text-center">Exam Marks (50%)</th>
                      <th className="py-2.5 text-center">Class Projects (40%)</th>
                      <th className="py-2.5 text-center">Attendance (10%)</th>
                      <th className="py-2.5 text-center">Total Marks</th>
                      <th className="py-2.5 text-center">Letter Grade</th>
                      <th className="py-2.5 text-right w-12">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentGrades.length > 0 ? (
                      studentGrades.map((g) => {
                        const weighted = computeWeightedAverage(g);
                        const state = getLetterGrade(weighted);
                        const isPassed = checkPass(weighted);
                        return (
                          <tr key={g.id} className="text-slate-700">
                            <td className="py-4">
                              <span className="font-bold text-slate-800">{g.subject}</span>
                              <span className="block text-[10px] text-slate-400 mt-1 italic max-w-xs truncate" title={g.feedback}>
                                "{g.feedback || 'Consistent academic efforts displayed.'}"
                              </span>
                            </td>
                            <td className="py-4 text-center font-bold font-mono text-slate-600">{g.examScore} / 100</td>
                            <td className="py-4 text-center font-mono text-slate-500">{g.assignmentScore} / 100</td>
                            <td className="py-4 text-center font-mono text-slate-400">{g.attendanceScore} / 10</td>
                            <td className="py-4 text-center font-extrabold text-slate-800 font-mono bg-slate-50/50">{weighted}%</td>
                            <td className="py-4 text-center">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-black ${state.badgeClass}`}>{state.char}</span>
                            </td>
                            <td className="py-4 text-right">
                              {isPassed ? (
                                <span className="text-xs font-bold text-emerald-600 inline-flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-0.5" /> Pass</span>
                              ) : (
                                <span className="text-xs font-bold text-rose-500 inline-flex items-center"><ShieldAlert className="w-3.5 h-3.5 mr-0.5" /> Fail</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">No exam marks have been posted for this student yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-150">
              <div className="space-y-2 border border-slate-100 rounded-2xl p-4 bg-slate-50/20">
                <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Overall Performance</h4>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-black text-indigo-700 tracking-tight">{cumulativeAverage}%</span>
                  <span className="text-xs font-bold text-slate-500">Overall Score Average</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  The student has obtained an overall Grade <span className="font-bold text-indigo-700">{overallLetter.char}</span>, showing excellent academic performance.
                </p>
              </div>
              <div className="space-y-4 text-center md:text-right flex flex-col justify-end p-4">
                <div className="space-y-1.5 self-center md:self-end">
                  <div className="h-0.5 w-40 bg-slate-300 mx-auto md:mr-0 pt-0.5"></div>
                  <p className="text-xs font-bold text-slate-800">Headmaster / School Authority Signature</p>
                  <p className="text-[10px] text-slate-400 tracking-wide uppercase">MD. Rahman, Principal Coordinator</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 text-center text-[10px] text-slate-400">
              <p>Digital Report Card copy. Issued by Wisdom Bangladesh Academy, Dhaka.</p>
              <p className="mt-1">Verify Serial Code: 1A9-F73B-C29X31-L90F</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
