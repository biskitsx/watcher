"use client";
import React from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadcrumbAppProps {}

export const BreadcrumbApp = ({}: BreadcrumbAppProps) => {
  const currentPathname = usePathname();
  let paramArr = currentPathname.split("/");
  let size = paramArr.length;
  const newItems = paramArr?.map((param, idx) => {
    if (idx == size - 1) {
      return {
        title: param[0].toUpperCase() + param.slice(1),
      };
    }
    if (param === "") {
      return {
        title: (
          <Link href="/" className="capitalize">
            home
          </Link>
        ),
      };
    }
    return {
      title: (
        <Link href={`/${param}`} className="capitalize">
          {param}
        </Link>
      ),
    };
  });
  return <Breadcrumb items={newItems} />;
};
