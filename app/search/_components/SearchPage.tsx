"use client";
import { Select } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

interface SearchPageProps {}
export const SearchPage = ({}: SearchPageProps) => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("movie"); // ["anime", "movie", "serie"
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="flex gap-4">
        <Search
          placeholder="..."
          size="large"
          enterButton
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          loading={loading}
        />
        <Select
          defaultValue={type}
          size="large"
          style={{ width: 170 }}
          onChange={(value) => {
            setType(value);
          }}
          options={[
            { value: "movie", label: "Movie" },
            { value: "serie", label: "Serie" },
            { value: "anime", label: "Anime" },
          ]}
        />
      </div>
    </div>
  );
};
