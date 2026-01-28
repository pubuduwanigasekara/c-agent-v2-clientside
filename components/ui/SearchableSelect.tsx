"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option...",
  disabled,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl transition-all outline-none focus:ring-2 focus:ring-[#ef660f]/50 focus:border-[#ef660f] ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-white/20 hover:bg-white/10"
        }`}
      >
        <span
          className={`truncate text-left flex-1 ${!selectedOption ? "text-white/40" : "text-white/80 font-medium"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="w-4 h-4 text-white/50 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#11074b] border border-white/10 rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 top-full ring-1 ring-white/10">
          <div className="p-2 border-b border-white/10 bg-white/5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-black/40 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-[#ef660f]/50 focus:border-[#ef660f] text-white font-medium placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                    value === opt.value
                      ? "bg-[#ef660f]/10 text-[#ef660f] font-bold border border-[#ef660f]/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <span className="truncate text-left">{opt.label}</span>
                  {value === opt.value && (
                    <Check className="w-4 h-4 text-[#ef660f] shrink-0" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center">
                <p className="text-xs font-medium text-slate-500">
                  No results found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
