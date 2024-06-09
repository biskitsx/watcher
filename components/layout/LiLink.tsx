import Link from "next/link";

interface LiLinkProps {
  currentPathname: string;
  pathname: string;
}
export const LiLink = ({ currentPathname, pathname }: LiLinkProps) => {
  const firstPathname = currentPathname.split("/")[1];
  let liClassName =
    `/${firstPathname}` === `/${pathname}` ? "active_link" : "inactive_link";
  if (firstPathname === "" && pathname === "home") {
    liClassName = "active_link";
  }

  return (
    <li className={liClassName}>
      <Link
        href={pathname == "home" ? "/" : `/${pathname}`}
        className="capitalize"
      >
        {pathname}
      </Link>
    </li>
  );
};
