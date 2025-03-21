"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "../Logo";
import { LiLink } from "./LiLink";
import { signOut, useSession } from "next-auth/react";
import { AuthStatus, avatarProfile } from "@/constant/auth";
import { Button } from "antd";
import { useToast } from "@chakra-ui/react";
import { toastConfig } from "../toast/ToastConfig";
import { cn } from "@/util/cn";
import { font } from "@/util/font";
import { FiMoreVertical } from "react-icons/fi";
import { getRandomAvatar } from "@/constant/random_avatar";
import { Session } from "next-auth";
interface NavbarProps {
  session: Session | null;
}
export const Navbar = ({ session }: NavbarProps) => {
  const isLogin = session?.user ? true : false;
  const toast = useToast();
  const currentPathname = usePathname();
  const mediaTypeGroups = ["movie", "serie", "anime"];
  const mediaTypeGroup = currentPathname.split("/")[1];
  const isMediaTypeGroup = mediaTypeGroups.includes(mediaTypeGroup);
  const browsePath = isMediaTypeGroup
    ? `/browse/${mediaTypeGroup}`
    : "/browse/movie";
  const navbarTranparentPath = ["/", "/search"];
  const [homeClassName, setHomeClassName] = useState(
    "bg-transparent text-base-100"
  );
  const OtherClassName = "bg-base-100 shadow-md";
  const isAuthPage = ["/auth/login", "/auth/signup"].includes(currentPathname);
  const shouldTransparent = navbarTranparentPath.includes(currentPathname);
  if (shouldTransparent) {
    if (typeof window !== "undefined") {
      const changeColor = () => {
        if (window.scrollY > 70) {
          setHomeClassName(OtherClassName);
        } else {
          setHomeClassName("bg-transparent text-base-100");
        }
      };
      window.addEventListener("scroll", changeColor);
    }
  }

  const handleSignOut = async () => {
    toast({
      title: "Logging out...",
      status: "loading",
      ...toastConfig,
    });
    await signOut({ callbackUrl: "/" });
    toast({
      title: "Logout Successfully",
      status: "success",
      ...toastConfig,
    });
  };

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="z-50">
      {!shouldTransparent && <div className="navbar bg-transparent"></div>}
      <div
        className={`fixed top-0 w-full z-50  transition-colors  ${
          shouldTransparent ? homeClassName : OtherClassName
        }`}
      >
        <div className={cn("px-8", font.className)}>
          <div className="navbar justify-between flex p-0 items-center">
            <Link href={"/"}>
              <Logo />
            </Link>
            <ul className="gap-2 font-normal text-xs sm:text-sm sm:gap-4 hidden sm:flex">
              <LiLink currentPathname={currentPathname} pathname="home" />
              <LiLink currentPathname={currentPathname} pathname="movie" />
              <LiLink currentPathname={currentPathname} pathname="serie" />
              <LiLink currentPathname={currentPathname} pathname="anime" />
              <span className="">|</span>
              <LiLink currentPathname={currentPathname} pathname="profile" />
            </ul>
            <div className="flex">
              <Link href={browsePath}>
                <button className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </Link>
              {isLogin && session?.user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={getRandomAvatar(session.user.id)}
                        // src={session?.user?.image || avatarProfile}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://cdn-icons-png.freepik.com/512/219/219986.png";
                        }}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
                  >
                    <li>
                      <Link className="" href={"/profile"}>
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li>
                      <a onClick={handleSignOut}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-x-2">
                  <Button
                    type="primary"
                    href="/auth/login"
                    className=" tracking-wider"
                  >
                    Login
                  </Button>
                </div>
              )}
              <div className="dropdown dropdown-end sm:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <FiMoreVertical size={20} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
                >
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link href={"/movie"}>Movie</Link>
                  </li>
                  <li>
                    <Link href={"/serie"}>Serie</Link>
                  </li>
                  <li>
                    <Link href={"/anime"}>Anime</Link>
                  </li>
                  <li></li>
                  <li>
                    <Link href={"/profile"}>Profile</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
