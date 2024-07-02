"use client";
import React, { useEffect, useState } from "react";
import { Table, Select, Space } from "antd";
import type { TableProps } from "antd";
import { MediaInfoProps } from "@/wrapper/media-info";
import { Media, Status } from "@prisma/client";
import {
  getUserWatchList,
  updateMediaRating,
  updateMediaStatus,
} from "@/app/api/media/actions";
import Link from "next/link";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { toastConfig } from "../toast/ToastConfig";

interface TitleTableProps {
  title: string;
  href: string;
}

interface StatusTableProps {
  status: Status;
  mediaId: string;
  mediaType: string;
}

interface RatingTableProps {
  rating: number;
  mediaId: string;
  mediaType: string;
}

interface DataType {
  key: string;
  image: string;
  title: TitleTableProps;
  status: StatusTableProps;
  type: string;
  actions?: string;
  rating: RatingTableProps;
}

interface TrackTableProps {
  media: Media[];
}

export const TrackTable = ({ media }: TrackTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userWatchList, setUserWatchList] = useState<Media[]>(media);
  const [dataSource, setDataSource] = useState<DataType[]>([] as DataType[]);
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const toast = useToast();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No",
      dataIndex: "key",
      width: 50,
    },
    {
      title: "Image",
      dataIndex: "image",
      width: 120,
      render: (img_url) => (
        <img src={img_url} alt={img_url} className="w-full" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      render: ({ title, href }: TitleTableProps) => (
        <Link href={href}>{title}</Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: ({ status, mediaId, mediaType }: StatusTableProps) => {
        const handleSelectStatusChange = async (value: Status) => {
          await updateMediaStatus(mediaType, mediaId, value);
          toast({
            title: "Status has changed successfully",
            status: "success",
            ...toastConfig,
          });
        };

        return (
          <Select
            defaultValue={status}
            onChange={handleSelectStatusChange}
            options={[
              { value: Status.PLAN_TO_WATCH, label: "plan" },
              { value: Status.WATCHING, label: "watching" },
              { value: Status.DROPPED, label: "drop" },
              { value: Status.WATCHED, label: "watched" },
            ]}
          />
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: ({ mediaId, mediaType, rating }: RatingTableProps) => {
        const handleSelectRatingChange = async (value: number) => {
          await updateMediaRating(mediaType, mediaId, value);
          toast({
            title: "Rating has changed successfully",
            status: "success",
            ...toastConfig,
          });
        };

        return (
          <Select
            defaultValue={rating}
            onChange={handleSelectRatingChange}
            style={{ width: 110 }}
            options={[
              { value: -1, label: "no rating" },
              ...scale.map((item) => {
                return { value: item, label: item.toString() };
              }),
            ]}
          />
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="space-x-2">
          <Button onClick={onOpen}>Edit</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    let temp = userWatchList.map((item: Media, idx: number) => {
      return {
        key: (idx + 1).toString(),
        image: item.mediaPoster,
        status: {
          mediaId: item.mediaId,
          mediaType: item.mediaType,
          status: item.status,
        },
        title: {
          title: item.mediaTitle,
          href: `${item.mediaType}/${item.mediaId}`,
        },
        type: item.mediaType,
        rating: {
          mediaId: item.mediaId,
          mediaType: item.mediaType,
          rating: item.point,
        },
      } as DataType;
    });
    setDataSource(temp);
  }, [userWatchList]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
