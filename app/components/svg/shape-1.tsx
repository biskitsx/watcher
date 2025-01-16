interface Shape1Props {
  className?: string;
}
export const Shape1 = ({ className }: Shape1Props) => {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width="200px"
      height="200px"
      className={className}
    >
      {" "}
      <defs>
        {" "}
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          {" "}
          <stop
            id="stop1"
            stop-color="rgba(248, 117, 55, 1)"
            offset="0%"
          ></stop>{" "}
          <stop
            id="stop2"
            stop-color="rgba(251, 168, 31, 1)"
            offset="100%"
          ></stop>{" "}
        </linearGradient>{" "}
      </defs>{" "}
      <path
        fill="url(#sw-gradient)"
        d="M26,-28.8C33.5,-24.7,39.1,-16.3,41.6,-6.7C44.1,2.9,43.3,13.8,38.5,22.3C33.7,30.9,24.8,37.2,15.3,39.7C5.7,42.3,-4.4,41,-12.6,37C-20.8,33,-27.2,26.2,-32.5,18.2C-37.7,10.2,-41.8,1.1,-40.3,-7.1C-38.9,-15.3,-31.9,-22.5,-24.3,-26.5C-16.6,-30.5,-8.3,-31.2,0.5,-31.8C9.3,-32.4,18.6,-32.8,26,-28.8Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        stroke-width="0"
      ></path>{" "}
    </svg>
  );
};
