"use client";

import { useEffect, useState } from "react";
import { getPlayers } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Search, Plus, UserPlus, X } from "lucide-react";

export default function PlayerMultiSelect({
  team,
  selectedPlayers,
  onChange,
}: {
  team: string;
  selectedPlayers: string[];
  onChange: (players: string[]) => void;
}) {
  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [manualName, setManualName] = useState("");

  useEffect(() => {
    if (team) {
      getPlayers(team).then((res) => {
        const fetchedPlayers = res.data.players || [];
        setPlayers(fetchedPlayers);
        // Auto-select all players from the fetched team squad
        const playerNames = fetchedPlayers.map((p: any) => p.Full_Name);
        onChange(playerNames);
      });
    } else {
      setPlayers([]);
      onChange([]);
    }
  }, [team]);

  const toggle = (name: string) => {
    if (selectedPlayers.includes(name)) {
      onChange(selectedPlayers.filter((p) => p !== name));
    } else {
      onChange([...selectedPlayers, name]);
    }
  };

  const addManualPlayer = (nameOverride?: string) => {
    const nameToUse = nameOverride || manualName;
    const trimmed = nameToUse.trim();
    if (trimmed && !selectedPlayers.includes(trimmed)) {
      onChange([...selectedPlayers, trimmed]);
      setManualName("");
    }
  };

  const clearAll = () => onChange([]);

  // Merge catalog players and manual players for display
  const allDisplayPlayers = [
    ...players,
    ...selectedPlayers
      .filter((name) => !players.some((p) => p.Full_Name === name))
      .map((name) => ({
        Player_id: `manual_${name}`,
        Full_Name: name,
        isManual: true,
      })),
  ];

  const filteredPlayers = allDisplayPlayers.filter((p) =>
    p.Full_Name.toLowerCase().includes(search.toLowerCase()),
  );

  const isInvalid = selectedPlayers.length < 11;

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md ring-1 ring-white/10">
      <div className="bg-[#11074b]/50 px-4 py-3 border-b border-white/10 flex justify-between items-center">
        <p className="text-sm font-semibold  text-left tracking-tight text-white/60">
          {team || "Players"} Selector
        </p>
        <div className="flex items-center gap-3">
          {selectedPlayers.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[10px] font-bold text-white/40 hover:text-red-400  tracking-tight transition-colors"
            >
              Clear
            </button>
          )}
          <div className="flex items-center gap-2">
            {isInvalid && team && (
              <span className="text-[9px] font-medium text-red-400  tracking-tighter">
                Min 11
              </span>
            )}
            <Badge
              className={`${
                isInvalid
                  ? "bg-red-500/20 text-red-500"
                  : "bg-[#ef660f] text-white"
              } border-none rounded-none text-[10px] transition-colors`}
            >
              {selectedPlayers.length} Selected
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search squad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-white bg-white/5 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#ef660f]/50 transition-all font-medium placeholder:text-white/40"
          />
        </div>

        {/* Player List */}
        <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((p) => {
              const isActive = selectedPlayers.includes(p.Full_Name);
              return (
                <button
                  key={p.Player_id}
                  onClick={() => toggle(p.Full_Name)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-all group ${
                    isActive
                      ? "bg-[#ef660f]/20 text-white border border-[#ef660f]/40"
                      : "hover:bg-white/5 text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold truncate text-left flex-1 text-white`}
                    >
                      {p.Full_Name}
                    </span>
                    {p.isManual && (
                      <span className="text-[8px] bg-white/10 text-white/60 px-1 py-0.5 rounded font-black uppercase">
                        Manual
                      </span>
                    )}
                  </div>
                  <div
                    className={`transition-opacity ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-30"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          ) : search.trim() ? (
            <button
              onClick={() => {
                addManualPlayer(search);
                setSearch("");
                setManualName("");
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-sm text-white bg-[#ef660f]/10 hover:bg-[#ef660f]/20 transition-all border border-[#ef660f]/20 border-dashed"
            >
              <UserPlus className="w-4 h-4 text-[#ef660f]" />
              <div className="text-left font-bold truncate">
                Add "<span className="italic">{search}</span>" to squad
              </div>
            </button>
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs font-medium text-white/40  tracking-tight">
                Select players to continue
              </p>
            </div>
          )}
        </div>

        {/* Manual Addition */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              <input
                type="text"
                placeholder="Add custom player..."
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addManualPlayer()}
                className="w-full pl-9 pr-4 py-2 bg-[#11074b]/50 border border-white/10 text-white rounded-lg text-xs focus:ring-1 focus:ring-[#ef660f] outline-none font-medium placeholder:text-white/40"
              />
            </div>
            <button
              onClick={() => addManualPlayer()}
              className="bg-[#ef660f] text-white px-4 rounded-lg hover:bg-[#ef660f]/80 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
