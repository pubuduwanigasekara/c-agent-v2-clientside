"use client";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function Select({
  label,
  value,
  options,
  onChange,
  disabled,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1 text-slate-400">
      {label && (
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900 border-slate-700 text-white appearance-none">
        <option value="" className="bg-slate-900 text-slate-400">
          Select
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-slate-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
