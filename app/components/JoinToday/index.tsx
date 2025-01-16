"use client";
import { Container } from "@/components/layout/Container";

import { MediaInfoProps } from "@/wrapper/media-info";
import { Box } from "@chakra-ui/react";
import { Button } from "antd";
import { StarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface JoinTodayProps {
  media: MediaInfoProps;
}
export const JoinToday = ({ media }: JoinTodayProps) => {
  const session = useSession();

  const isLogin = session?.data?.user ? true : false;

  const title = isLogin ? "Welcome Back to Your Entermaint Hub" : "Join Today";
  const joinTodayText =
    "Join today and take full control of your entertainment journey. Track all the media you love, from movies and TV shows to music and more, all in one place. Unlock personalized recommendations based on your interests and viewing habits, helping you discover new favorites effortlessly. Start your adventure now and never miss a moment of entertainment tailored just for you!";
  const loginText =
    "Welcome back! Dive into your personalized entertainment hub, where you can track your favorite movies, TV shows, music, and more. Explore tailored recommendations crafted just for you, and discover new content that matches your unique tastes. Start browsing now and make every moment of entertainment unforgettable!";
  const description = isLogin ? loginText : joinTodayText;
  const buttonGroups = useMemo(() => {
    if (isLogin) {
      return [
        {
          title: "Movies",
          href: "/movies",
        },
        {
          title: "TV Shows",
          href: "/tv-shows",
        },
        {
          title: "Anime",
          href: "/anime",
        },
        {
          title: "Browse",
          href: "/browse/movie",
        },
        {
          title: "Profile",
          href: "/profile",
        },
      ];
    } else {
      return [
        {
          title: "Login",
          href: "/auth/login",
        },
        {
          title: "Sign Up",
          href: "/auth/signup",
        },
      ];
    }
  }, [isLogin]);
  return (
    <Box className="relative shadow-md">
      <Box
        backgroundImage={media.backdrop_path}
        backgroundPosition="top"
        backgroundSize="cover"
      >
        <div className="bg-[rgba(0,0,0,0.7)]">
          <Container className="py-12 text-white">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              <StarIcon fill="white" className="animate-spin delay-1000" />
            </div>
            <p className="text-white italic">{description}</p>
            <div className="flex gap-2 flex-wrap">
              {buttonGroups.map((button, index) => (
                <Button
                  key={index}
                  type="primary"
                  href={button.href}
                  className=" tracking-wider"
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </Container>
        </div>
      </Box>
    </Box>
  );
};
