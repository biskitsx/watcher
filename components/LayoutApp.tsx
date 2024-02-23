"use client";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Input, Layout, Menu, theme } from "antd";
import type { SearchProps } from "antd/es/input/Search";

import React, { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const newItems: MenuProps["items"] = [
  {
    key: "1",
    icon: React.createElement(CloudOutlined),
    label: "Home",
  },
  {
    key: "2",
    icon: React.createElement(VideoCameraOutlined),
    label: "Movies",
  },
  {
    key: "3",
    icon: React.createElement(UploadOutlined),
    label: "TV Series",
  },
  {
    key: "4",
    icon: React.createElement(BarChartOutlined),
    label: "Upcoming",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutApp = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgBase },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Layout className="w-full">
      <Sider
        // collapsible
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        // style={{
        //   overflow: "auto",
        //   height: "100vh",
        //   position: "fixed",
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
        //   width: 200,
        // }}
      >
        <div className="h-16 flex items-center justify-center transition-all">
          {collapsed ? (
            <h1 className="font-bold text-white text-2xl">📸</h1>
          ) : (
            <h1 className="font-bold text-white text-2xl">watcher 📸</h1>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={newItems}
        />
      </Sider>
      <div className="container">
        <div className="h-16 flex items-center justify-between container gap-6">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: "100%" }}
          />
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </div>
        <Content>
          <>{children}</>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </div>
    </Layout>
  );
};
