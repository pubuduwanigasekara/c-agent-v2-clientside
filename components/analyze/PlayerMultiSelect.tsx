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

  const addManualPlayer = () => {
    const trimmed = manualName.trim();
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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white ">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <p className="text-sm font-semibold  text-left tracking-tight text-slate-500">
          {team || "Players"} Selector
        </p>
        <div className="flex items-center gap-3">
          {selectedPlayers.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500  tracking-tight transition-colors">
              Clear
            </button>
          )}
          <div className="flex items-center gap-2">
            {isInvalid && team && (
              <span className="text-[9px] font-medium text-red-500  tracking-tighter">
                Min 11
              </span>
            )}
            <Badge
              className={`${
                isInvalid ? "bg-red-500 hover:bg-red-600" : "bg-blue-600"
              } text-white border-none rounded-none text-[10px] transition-colors`}>
              {selectedPlayers.length} Selected
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <input
            type="text"
            placeholder="Search squad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-black bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
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
                      ? "bg-blue-50 text-blue-700 border border-blue-100/50"
                      : "hover:bg-slate-50 text-slate-600 border border-transparent"
                  }`}>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold truncate text-left flex-1 ${
                        isActive ? "text-blue-700" : "text-slate-700"
                      }`}>
                      {p.Full_Name}
                    </span>
                    {p.isManual && (
                      <span className="text-[8px] bg-slate-200 text-slate-500 px-1 py-0.5 rounded font-black uppercase">
                        Manual
                      </span>
                    )}
                  </div>
                  <div
                    className={`transition-opacity ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-30"
                    }`}>
                    <X className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          ) : search.trim() ? (
            <button
              onClick={() => {
                setManualName(search);
                addManualPlayer();
                setSearch("");
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all border border-blue-200 border-dashed">
              <UserPlus className="w-4 h-4" />
              <div className="text-left font-bold truncate">
                Add "<span className="italic">{search}</span>" to squad
              </div>
            </button>
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs font-medium text-slate-400  tracking-tight">
                Select players to continue
              </p>
            </div>
          )}
        </div>

        {/* Manual Addition */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Add custom player..."
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addManualPlayer()}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 text-black rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
            <button
              onClick={addManualPlayer}
              className="bg-slate-900 text-white px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
