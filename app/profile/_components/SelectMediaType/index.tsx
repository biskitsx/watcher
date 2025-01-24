import { Select, Tooltip } from "antd";
import { useState } from "react";

export function SelectMediaType({
  onChange,
  className,
}: {
  onChange: (value: string) => Promise<void>;
  className?: string;
}) {
  const options = [
    { value: "movie", label: "Movie" },
    { value: "serie", label: "Serie" },
    { value: "anime", label: "Anime" },
  ];
  const [mediaType, setMediaType] = useState<string | null>(null);

  return (
    <div className={className}>
      <Tooltip title="Select Media Type">
        <Select
          options={options}
          size="middle"
          style={{ minWidth: 130, width: "100%" }}
          value={mediaType}
          placeholder="Media Type"
          onChange={async (value) => {
            setMediaType(value);
            await onChange(value);
          }}
          allowClear
        />
      </Tooltip>
    </div>
  );
}
