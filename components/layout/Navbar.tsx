"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "../Logo";
import { LiLink } from "./LiLink";
import { signOut, useSession } from "next-auth/react";
import { AuthStatus, avatarProfile } from "@/constant/auth";
import { Button } from "antd";
import { cn } from "@/util/cn";
import { useToast } from "@chakra-ui/react";
import { toastConfig } from "../toast/ToastConfig";
interface NavbarProps {}
export const Navbar = ({}: NavbarProps) => {
  const { data: session, status } = useSession();
  const toast = useToast();
  const currentPathname = usePathname();
  const [homeClassName, setHomeClassName] = useState(
    "bg-transparent text-base-100"
  );
  const OtherClassName = "bg-base-100 shadow-md";

  if (currentPathname == "/") {
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
  return (
    <header className="">
      {currentPathname != "/" && (
        <div className="navbar bg-transparent my-2"></div>
      )}
      <div
        className={`fixed top-0 w-full z-10  transition-colors  ${
          currentPathname == "/" ? homeClassName : OtherClassName
        }`}
      >
        <div className="px-8">
          <div className="navbar justify-between flex p-0 items-center">
            <Link href={"/"}>
              <Logo />
            </Link>
            <ul className="flex gap-2 font-normal text-xs sm:text-sm sm:gap-4">
              <LiLink currentPathname={currentPathname} pathname="home" />
              <LiLink currentPathname={currentPathname} pathname="movies" />
              <LiLink currentPathname={currentPathname} pathname="series" />
              <LiLink currentPathname={currentPathname} pathname="anime" />
              <span className="">|</span>
              <LiLink currentPathname={currentPathname} pathname="recommend" />
              <LiLink currentPathname={currentPathname} pathname="calendar" />
              <LiLink currentPathname={currentPathname} pathname="track" />
            </ul>
            <div className="flex">
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
              {status === AuthStatus.AUTHENTICATED ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={session?.user?.image || avatarProfile}
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
                      <a>Settings</a>
                    </li>
                    <li>
                      <a onClick={handleSignOut}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-x-2">
                  {/* <Button
                    type="default"
                    href="/auth/login"
                    className=" tracking-wider"
                  >
                    SIGN UP
                  </Button> */}
                  <Button
                    type="primary"
                    href="/auth/login"
                    className=" tracking-wider"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
