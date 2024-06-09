"use client";

import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Avatar, Flex } from "antd";
import { useSession, signOut } from "next-auth/react";
import { ProfileTabs } from "./ProfileTabs";
import { Media } from "@prisma/client";

interface ProfilePageProps {
  watchlist: Media[];
  ratings: Media[];
}
export default function ProfilePage({ watchlist, ratings }: ProfilePageProps) {
  const { data: session, status } = useSession();

  return (
    <PageContainer className="gap-0">
      {/* <div className=" bg-custom"> */}
      <div className=" bg-[#F79552]">
        <Container className="py-24 flex flex-row items-center">
          <Avatar size={120} src={session?.user?.image} />
          <div className="text-3xl font-semibold">
            hello, {session?.user?.name}
          </div>
        </Container>
      </div>
      <ProfileTabs watchlist={watchlist} ratings={ratings} />
    </PageContainer>
  );
}
