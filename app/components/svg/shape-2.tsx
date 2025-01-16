interface Shape2Props {
  className?: string;
}

export const Shape2 = ({ className }: Shape2Props) => {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className={className}
    >
      {" "}
      <defs>
        {" "}
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          {" "}
          <stop
            id="stop1"
            stopColor="rgba(248, 117, 55, 1)"
            offset="0%"
          ></stop>{" "}
          <stop
            id="stop2"
            stopColor="rgba(251, 168, 31, 1)"
            offset="100%"
          ></stop>{" "}
        </linearGradient>{" "}
      </defs>{" "}
      <path
        fill="url(#sw-gradient)"
        d="M35.1,-19.1C41.7,-8.8,40.8,7.1,33.7,19C26.6,30.9,13.3,38.9,0.8,38.4C-11.6,37.9,-23.2,29,-29.8,17.4C-36.3,5.8,-37.8,-8.4,-32,-18.3C-26.2,-28.2,-13.1,-33.7,0.6,-34C14.2,-34.3,28.5,-29.5,35.1,-19.1Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        strokeWidth="0"
        stroke="url(#sw-gradient)"
      ></path>{" "}
    </svg>
  );
};
