import { Select, Tooltip } from "antd";
import { useState } from "react";

const getOptionsByType = (type: "rating" | "watchlist") => {
  if (type === "rating") {
    return [
      { value: "rating", label: "Rating" },
      { value: "date_rate", label: "Date Rate" },
      { value: "popularity", label: "Popularity" },
      { value: "title", label: "Title" },
    ];
  }
  return [
    { value: "rating", label: "Rating" },
    { value: "", label: "Watchlist Date" },
    { value: "popularity", label: "Popularity" },
    { value: "title", label: "Title" },
  ];
};
export function SortingMedia({
  onChange,
  className,
  type = "rating",
}: {
  onChange: (value: string) => Promise<void>;
  className?: string;
  type: "rating" | "watchlist";
}) {
  const options = getOptionsByType(type);
  const [sorting, setSorting] = useState<string | null>(null);

  return (
    <div className={className}>
      <Tooltip title="Sorting">
        <Select
          options={options}
          variant="filled"
          size="middle"
          style={{ minWidth: 130, width: "100%" }}
          value={sorting}
          placeholder="Sort by"
          onChange={async (value) => {
            setSorting(value);
            await onChange(value);
          }}
          allowClear
        />
      </Tooltip>
    </div>
  );
}
