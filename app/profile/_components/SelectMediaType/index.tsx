import { Select, Tooltip } from "antd";
import { useState } from "react";

export function SelectMediaType({
  onChange,
}: {
  onChange: (value: string) => Promise<void>;
}) {
  const options = [
    { value: "movie", label: "Movie" },
    { value: "serie", label: "Serie" },
    { value: "anime", label: "Anime" },
  ];
  const [mediaType, setMediaType] = useState<string | null>(null);

  return (
    <Tooltip title="Select Media Type">
      <Select
        options={options}
        size="middle"
        style={{ width: 130 }}
        value={mediaType}
        placeholder="Media Type"
        onChange={async (value) => {
          setMediaType(value);
          await onChange(value);
        }}
        allowClear
      />
    </Tooltip>
  );
}
