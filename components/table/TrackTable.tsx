"use client";
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  image: string;
  title: string;
  progress: string;
  tags?: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "#",
    dataIndex: "key",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Image",
    // className: "column-money",
    dataIndex: "image",
    render: (img_url) => <img src={img_url} alt={img_url} />,
    // align: "right",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Progress",
    dataIndex: "progress",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: () => <a>Edit</a>,
  },
];

const data: DataType[] = [
  {
    key: "1",
    image: "#",
    title: "Naruto",
    progress: "1/4",
  },
];
interface TrackTableProps {}
export const TrackTable = ({}: TrackTableProps) => {
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
