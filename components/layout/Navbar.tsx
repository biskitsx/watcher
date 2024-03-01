"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "../Logo";

interface NavbarProps {}
export const Navbar = ({}: NavbarProps) => {
  // const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="">
      <div className="navbar"></div>
      <div className="shadow-md fixed top-0 w-full z-10 bg-base-100">
        <div className="container">
          <div className="navbar justify-between flex p-0 items-center">
            <Link href={"/"}>
              <Logo />
            </Link>
            <ul className="flex gap-2 font-normal text-xs sm:text-sm sm:gap-4">
              <li
                className={pathname === "/" ? "active_link" : "inactive_link"}
              >
                <Link href={"/"} passHref onClick={() => handleLinkClick("/")}>
                  Home
                </Link>
              </li>
              <li
                className={
                  pathname === "/movies" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/movies"}
                  passHref
                  onClick={() => handleLinkClick("/movies")}
                >
                  Movies
                </Link>
              </li>
              <li
                className={
                  pathname === "/series" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/series"}
                  passHref
                  onClick={() => handleLinkClick("/series")}
                >
                  Series
                </Link>
              </li>
              <li
                className={
                  pathname === "/anime" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/anime"}
                  passHref
                  onClick={() => handleLinkClick("/anime")}
                >
                  Anime
                </Link>
              </li>
              <span className="font-semibold">|</span>
              <li
                className={
                  pathname === "/track" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/track"}
                  passHref
                  onClick={() => handleLinkClick("/track")}
                >
                  Track
                </Link>
              </li>
              <li
                className={
                  pathname === "/review" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/review"}
                  passHref
                  onClick={() => handleLinkClick("/review")}
                >
                  Review
                </Link>
              </li>
            </ul>
            <div className="flex-none">
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

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
