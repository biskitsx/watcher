"use client";

import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";
import { ProfileTabs } from "./ProfileTabs";
import { Media } from "@prisma/client";
import { RadialProgress } from "@/components/media/RadialProgress";

interface ProfilePageProps {
  watchlist: Media[];
  ratings: Media[];
  user: any;
}

export default function ProfilePage({
  watchlist,
  ratings,
  user,
}: ProfilePageProps) {
  const scores = [50, 60, 0];
  const image = user?.image;
  return (
    <PageContainer className="gap-0">
      {/* <div className=" bg-custom"> */}
      <div className=" bg-custom">
        <Container className="py-12 sm:py-24 flex flex-col sm:flex-row items-center">
          <div>
            <Avatar size={120} src={image} />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="text-3xl font-semibold text-center sm:text-start">
              hello, {user?.name}
            </div>
            <div className="flex gap-4 justify-center sm:justify-start w-full">
              {scores.map((score, index) => (
                <div
                  className="flex items-center gap-3  justify-between"
                  key={index}
                >
                  <div className="hidden sm:block">
                    <RadialProgress
                      value={score}
                      size="48px"
                      thickness="3px"
                      className="text-sm"
                    />
                  </div>
                  <div className="sm:hidden ">
                    <RadialProgress value={score} />
                  </div>
                  <p className="text-white font-medium text-xs sm:text-base">
                    Average <br />
                    Movie Score
                  </p>
                  {index != 2 && (
                    <div className="h-full w-[2px] bg-white rounded-md" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <ProfileTabs watchlist={watchlist} ratings={ratings} />
    </PageContainer>
  );
}
