"use client";

import { useEffect, useState } from "react";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { getGrounds } from "@/lib/api";

export default function GroundSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (ground: string) => void;
}) {
  const [grounds, setGrounds] = useState<any[]>([]);

  useEffect(() => {
    getGrounds().then((res) => setGrounds(res.data.grounds));
  }, []);

  const options = grounds.map((g) => ({
    value: g.display_name,
    label: g.display_name,
  }));

  return (
    <SearchableSelect
      label="Match Ground"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Select ground..."
    />
  );
}
