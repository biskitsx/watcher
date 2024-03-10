import React from "react";
import { Breadcrumb } from "antd";
import { title } from "process";

interface BreadcrumbAppProps {
  items: any[];
}

export const BreadcrumbApp = ({ items }: BreadcrumbAppProps) => (
  <Breadcrumb
    // items={[
    //   {
    //     title: "Home",
    //   },
    //   {
    //     title: "Forums",
    //   },
    // ]}
    items={items?.map((item) => {
      return { title: item };
    })}
  />
);
