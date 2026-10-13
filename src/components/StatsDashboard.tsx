import { useMemo } from 'react';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Percent, Award, Clock } from 'lucide-react';
import { Student, Teacher, ClassSection, Grade, Attendance, Invoice } from '../types/school';

interface StatsDashboardProps {
  students: Student[];
  teachers: Teacher[];
  classes: ClassSection[];
  grades: Grade[];
  attendance: Attendance[];
  invoices: Invoice[];
}

export default function StatsDashboard({
  students,
  teachers,
  classes,
  grades,
  attendance,
  invoices,
}: StatsDashboardProps) {
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;

  const totalRevenue = useMemo(() => {
    return invoices
      .filter((inv) => inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.amount, 0);
  }, [invoices]);

  const attendanceRate = useMemo(() => {
    if (attendance.length === 0) return 0;
    const present = attendance.filter((a) => a.status === 'present').length;
    return Math.round((present / attendance.length) * 100);
  }, [attendance]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Users className="w-4 h-4" /> Students
        </div>
        <div className="text-2xl font-bold mt-1">{totalStudents}</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <GraduationCap className="w-4 h-4" /> Teachers
        </div>
        <div className="text-2xl font-bold mt-1">{totalTeachers}</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <BookOpen className="w-4 h-4" /> Classes
        </div>
        <div className="text-2xl font-bold mt-1">{totalClasses}</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <DollarSign className="w-4 h-4" /> Revenue
        </div>
        <div className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 col-span-2">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Percent className="w-4 h-4" /> Attendance Rate
        </div>
        <div className="text-2xl font-bold mt-1">{attendanceRate}%</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 col-span-2">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Award className="w-4 h-4" /> Grades recorded
        </div>
        <div className="text-2xl font-bold mt-1">{grades.length}</div>
      </div>
    </div>
  );
}
