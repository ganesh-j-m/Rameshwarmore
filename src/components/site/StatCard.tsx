export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-gold pl-5">
      <p className="font-display text-4xl text-maroon">{value}</p>
      <p className="mt-1 text-sm text-inkSoft">{label}</p>
    </div>
  );
}
