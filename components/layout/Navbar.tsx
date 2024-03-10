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
  const [homeClassName, setHomeClassName] = useState(
    "bg-transparent text-base-100"
  );
  const OtherClassName = "bg-base-100 shadow-md";
  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  if (pathname == "/") {
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

  return (
    <div className="">
      {pathname != "/" && <div className="navbar bg-transparent my-2"></div>}
      <div
        className={`fixed top-0 w-full z-10  transition-colors  ${
          pathname == "/" ? homeClassName : OtherClassName
        }`}
      >
        {/* <div className="shadow-md fixed top-0 w-full z-10 bg-base-100"> */}
        <div className="px-8">
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
              <span className="">|</span>
              <li
                className={
                  pathname === "/calendar" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/calendar"}
                  passHref
                  onClick={() => handleLinkClick("/calendar")}
                >
                  Calendar
                </Link>
              </li>
              <li
                className={
                  pathname === "/forum" ? "active_link" : "inactive_link"
                }
              >
                <Link
                  href={"/forum"}
                  passHref
                  onClick={() => handleLinkClick("/forum")}
                >
                  Forum
                </Link>
              </li>
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
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
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
