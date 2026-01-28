export default function MatchDateTime({
  date,
  time,
  onDateChange,
  onTimeChange,
}: any) {
  // Get today's date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white">Match Date</label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-medium focus:ring-2 focus:ring-[#ef660f]/50 focus:border-[#ef660f] transition-all outline-none appearance-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white">Match Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-medium focus:ring-2 focus:ring-[#ef660f]/50 focus:border-[#ef660f] transition-all outline-none appearance-none"
        />
      </div>
    </div>
  );
}
