import { Building2, Phone, Mail, MapPin, Users, BookOpen, Award, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function SchoolWebsite({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <header className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="w-12 h-12 text-indigo-400" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Wisdom Academy</h1>
              <p className="text-slate-400">Excellence in Education since 2010</p>
            </div>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl">
            A modern school dedicated to academic excellence, character building, and holistic development of every student.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Students', value: '850+' },
          { icon: BookOpen, label: 'Teachers', value: '65' },
          { icon: Award, label: 'Years', value: '15+' },
          { icon: Building2, label: 'Campuses', value: '2' },
        ].map((item) => (
          <div key={item.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
            <item.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm text-slate-400">{item.label}</div>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-slate-400 leading-relaxed max-w-3xl">
          Wisdom Academy provides a nurturing environment where students excel academically and grow as responsible citizens. 
          Our curriculum combines traditional values with modern teaching methods, preparing students for future challenges.
        </p>
      </section>

      {/* Contact */}
      <section className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <div className="font-medium">Address</div>
              <div className="text-sm text-slate-400">123 Education Road, Dhaka 1205</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-sm text-slate-400">+880 2 1234 5678</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <div className="font-medium">Email</div>
              <div className="text-sm text-slate-400">info@wisdom-academy.edu</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © 2026 Wisdom Academy. All rights reserved.
      </footer>
    </div>
  );
}
