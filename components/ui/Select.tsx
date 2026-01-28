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
    <div className="flex flex-col gap-1 text-white/40">
      {label && (
        <label className="text-sm font-medium text-white/40">{label}</label>
      )}
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ef660f] bg-white/5 text-white appearance-none transition-all"
      >
        <option value="" className="bg-[#11074b] text-white/20">
          Select
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#11074b] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
