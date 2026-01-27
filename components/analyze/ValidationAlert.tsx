export default function ValidationAlert({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="rounded-lg bg-red-900/20 border border-red-900/50 px-4 py-3 text-sm text-red-400 font-medium">
      {message}
    </div>
  );
}
