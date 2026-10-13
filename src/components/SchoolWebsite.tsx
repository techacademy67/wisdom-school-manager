interface Props {
  onBack: () => void;
}

export default function SchoolWebsite({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-slate-800 rounded-lg">← Back</button>
      <h1 className="text-3xl font-bold mb-4">Wisdom Academy Website</h1>
      <p className="text-slate-400">Public school website placeholder. Full component coming soon.</p>
    </div>
  );
}
