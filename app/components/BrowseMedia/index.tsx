"use client";
import { debounce } from "lodash";
import { Input, Select } from "antd";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

interface BrowseMediaProps {
  mediaType: string;
  setValue: (value: string) => void;
  value: string;
  handleSearch: () => void;
}

export const BrowseMedia = ({
  mediaType,
  setValue,
  value,
  handleSearch,
}: BrowseMediaProps) => {
  const options = [
    { value: "movie", label: "Movies" },
    { value: "serie", label: "Series" },
    { value: "anime", label: "Anime" },
  ];
  const router = useRouter();

  // Wrap handleSearch with debounce
  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        handleSearch();
      }, 300),
    [handleSearch]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  const handleChange = (value: string) => {
    router.push(`/browse/${value}`);
  };

  return (
    <div className="flex flex-col gap-2 rounded-md !my-4">
      <div className="flex gap-2 items-center text-2xl">
        <div className="bg-secondary h-6 w-[5px]" />
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-3xl">Browse</h1>
          <Select
            className="!gap-2 !font-bold"
            defaultValue={mediaType}
            options={options}
            style={{ width: 120 }}
            variant="filled"
            onChange={handleChange}
          />
        </div>
      </div>
      <Input
        variant="filled"
        prefix={<SearchIcon size={14} stroke="gray" />}
        placeholder="Search"
        size="large"
        className="!gap-2 !flex !shadow-md bg"
        allowClear
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch();
        }}
      />
    </div>
  );
};
