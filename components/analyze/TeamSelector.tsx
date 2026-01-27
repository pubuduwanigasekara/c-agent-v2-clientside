"use client";

import { useEffect, useState } from "react";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { getTeams } from "@/lib/api";

export default function TeamSelector({
  label,
  value,
  onChange,
  disabledTeam,
}: {
  label: string;
  value: string;
  disabledTeam?: string;
  onChange: (team: string) => void;
}) {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    getTeams().then((res) => setTeams(res.data.teams));
  }, []);

  const options = teams
    .filter((t) => t.name !== disabledTeam)
    .map((t) => ({
      value: t.name,
      label: t.display_name,
    }));

  return (
    <SearchableSelect
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      placeholder="Select team..."
    />
  );
}
