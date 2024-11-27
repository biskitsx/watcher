"use client";
import React, { useEffect, useState } from "react";
import { Table, Select, Space, Tag } from "antd";
import type { TableProps } from "antd";
import { Media, Status } from "@prisma/client";
import { updateMediaRating, updateMediaStatus } from "@/app/api/media/actions";
import Link from "next/link";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { toastConfig } from "@/components/toast/ToastConfig";
import { Container } from "@/components/layout/Container";
import { palatte } from "@/constant/palatte";
import { cn } from "@/util/cn";
import { MediaCardHorizontal } from "@/app/components/MediaCardHorizontal";

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
  key: number;
  image: string;
  title: TitleTableProps;
  status: StatusTableProps;
  type: string;
  rating: RatingTableProps;
}

interface ProfileTableProps {
  media: Media[];
  title: string;
}

export const ProfileTable = ({ media, title }: ProfileTableProps) => {
  const [userMedia, setUserMedia] = useState<Media[]>(media);
  const [dataSource, setDataSource] = useState<DataType[]>([] as DataType[]);
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const toast = useToast();
  const columns: TableProps<DataType>["columns"] = [
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
      render: (type) => (
        <Tag
          color={cn({
            green: type === "anime",
            blue: type === "movie",
            purple: type === "serie",
          })}
        >
          {type}
        </Tag>
      ),
      filters: [
        { text: "Anime", value: "anime" },
        { text: "Movie", value: "movie" },
        { text: "Serie", value: "serie" },
      ],

      onFilter: (value, record) => {
        return record.type.indexOf(value as string) === 0;
      },
      filterSearch: true,
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
            size="small"
            defaultValue={status}
            onChange={handleSelectStatusChange}
            style={{ width: 170 }}
            options={[
              { value: Status.NOTHING, label: "not in Watchlist" },
              { value: Status.PLAN_TO_WATCH, label: "plan" },
              { value: Status.WATCHING, label: "watching" },
              { value: Status.DROPPED, label: "drop" },
              { value: Status.WATCHED, label: "watched" },
            ]}
          />
        );
      },
      filters: [
        { text: "Not in Watchlist", value: Status.NOTHING },
        { text: "Plan to Watch", value: Status.PLAN_TO_WATCH },
        { text: "Watching", value: Status.WATCHING },
        { text: "Dropped", value: Status.DROPPED },
        { text: "Watched", value: Status.WATCHED },
      ],
      onFilter: (value, record) => {
        return record.status.status.indexOf(value as Status) === 0;
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
            size="small"
            defaultValue={rating}
            onChange={handleSelectRatingChange}
            style={{ width: 110, fontSize: "small" }}
            options={[
              { value: -1, label: "no rating" },
              ...scale.map((item) => {
                return { value: item, label: item.toString() };
              }),
            ]}
          />
        );
      },
      sorter: (a, b) => a.rating.rating - b.rating.rating,
    },
  ];

  useEffect(() => {
    let temp = userMedia.map((item: Media, idx: number) => {
      return {
        key: idx,
        image: item.mediaBackDrop,
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
  }, [userMedia]);

  return (
    <Container>
      {title && <h1 className="text-2xl font-bold pt-6">{title}</h1>}
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        // pagination={{ pageSize: 5 }}
      />
    </Container>
  );
};
