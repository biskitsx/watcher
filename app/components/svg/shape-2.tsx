interface Shape2Props {
  className?: string;
}

export const Shape2 = ({ className }: Shape2Props) => {
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
            stop-color="rgba(55, 248, 218.578, 1)"
            offset="0%"
          ></stop>{" "}
          <stop
            id="stop2"
            stop-color="rgba(58.155, 98.939, 158.326, 1)"
            offset="100%"
          ></stop>{" "}
        </linearGradient>{" "}
      </defs>{" "}
      <path
        fill="url(#sw-gradient)"
        d="M17.6,-24.1C23.2,-23.9,28.3,-19.6,30.3,-14.2C32.3,-8.7,31.1,-2.2,28,2.5C25,7.2,20.1,10.2,16.9,15.7C13.8,21.2,12.4,29.3,7.8,34.2C3.2,39,-4.6,40.7,-10.8,38.2C-16.9,35.7,-21.4,29.1,-26.7,23.1C-32,17.1,-38.1,11.7,-38.5,5.9C-38.8,0,-33.3,-6.3,-28.2,-10.9C-23,-15.5,-18.3,-18.2,-13.6,-18.9C-9,-19.5,-4.5,-18.1,0.8,-19.3C6,-20.5,12.1,-24.3,17.6,-24.1Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        stroke-width="0"
        stroke="url(#sw-gradient)"
      ></path>{" "}
    </svg>
  );
};
