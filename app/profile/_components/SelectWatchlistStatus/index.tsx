import { Status } from "@prisma/client";
import { Select, Tooltip } from "antd";
import { useState } from "react";

export function SelectWatchlistStatus({
  onChange,
  className,
}: {
  onChange: (value: string) => void;
  className?: string;
}) {
  const options = [
    // { value: "", label: "All" },
    { value: Status.PLAN_TO_WATCH, label: "Plan to watch" },
    { value: Status.WATCHING, label: "Watching" },
    { value: Status.DROPPED, label: "Dropped" },
    { value: Status.WATCHED, label: "Watched" },
  ];
  const [watchlistStatus, setWatchlistStatus] = useState<string | null>(null);

  return (
    <div className={className}>
      <Tooltip title="Select Watchlist Status">
        <Select
          options={options}
          size="middle"
          style={{ width: 130 }}
          value={watchlistStatus}
          placeholder="Status"
          onChange={(value) => {
            setWatchlistStatus(value);
            onChange(value);
          }}
          allowClear
        />
      </Tooltip>
    </div>
  );
}
