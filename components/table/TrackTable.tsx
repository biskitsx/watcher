"use client";
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { MediaInfoProps } from "@/wrapper/handled";

interface DataType {
  key: string;
  image: string;
  title: string;
  status: "watching" | "watched" | "planned" | "dropped";
  tags?: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "#",
    dataIndex: "key",
    width: 50,
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Image",
    // className: "column-money",
    dataIndex: "image",
    render: (img_url) => <img src={img_url} alt={img_url} className="w-full" />,
    width: 100,
    // align: "right",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let textColor = "";
      if (status === "watching") textColor = "text-blue-500";
      else if (status === "watched") textColor = "text-green-500";
      else if (status === "planned") textColor = "text-yellow-500";
      else if (status === "dropped") textColor = "text-red-500";
      return <span className={textColor}>{status}</span>;
    },
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: () => <a>Edit</a>,
  },
];

// const data: DataType[] = [
//   {
//     key: "1",
//     image: "#",
//     title: "Naruto",
//     status: "1/4",
//   },
// ];

interface TrackTableProps {
  media: MediaInfoProps[];
}

// convert media to data
const convertMediaToData = (media: MediaInfoProps[]) => {
  const randomStatus = ["watching", "watched", "planned", "dropped"];
  const data: DataType[] = media?.map((item, idx) => {
    const status =
      randomStatus[Math.floor(Math.random() * randomStatus.length)];
    return {
      key: (idx + 1).toString(),
      image: item.backdrop_path,
      status: status,
      title: item.title,
    } as DataType;
  });
  return data;
};

export const TrackTable = ({ media }: TrackTableProps) => {
  const data = convertMediaToData(media);
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      title={() => "Your Track"}
      footer={() => ""}
    />
  );
};
