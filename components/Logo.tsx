interface LogoProps {}
export const Logo = ({}: LogoProps) => {
  return (
    <span>
      <div className="h-1 w-1/2 bg-custom"></div>
      <h1 className="uppercase text-base font-extrabold tracking-wide">
        watcher
      </h1>
    </span>
  );
};
