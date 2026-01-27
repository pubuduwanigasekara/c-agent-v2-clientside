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
        <label className="text-sm font-medium text-black">Match Date</label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-black">Match Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="w-full bg-slate-50  rounded-lg px-3 py-2 text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none border border-slate-200"
        />
      </div>
    </div>
  );
}
