import { Carousel } from "antd";
import { MediaInfoProps } from "@/wrapper/media-info";
interface HomeCarouselProps {
  items: MediaInfoProps[];
}

export const HomeCarousel = ({ items }: HomeCarouselProps) => {
  return (
    <div className="relative max-h-[60vh]  overflow-hidden">
      <div className="sm:hidden">
        <Carousel autoplay className="shadow-md brightness-50 max-h-[60vh]">
          {items.map((movie, index: number) => (
            <div key={index} className="relative">
              <img
                src={movie.poster_path}
                alt={movie.title}
                // width={1920}
                // height={1080}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="hidden sm:block">
        <Carousel autoplay className="shadow-md brightness-50 max-h-[60vh]">
          {items.map((movie, index: number) => (
            <div key={index} className="relative">
              <img
                src={movie.backdrop_path}
                alt={movie.title}
                // width={1920}
                // height={1080}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="absolute w-full top-1/2 text-base-100 max-h-[60vh] text-center tracking-wider">
        <div className="text-5xl font-extrabold flex justify-center items-end gap-2 text-white">
          <h1 className="text-2xl md:text-5xl font-extrabold">Welcome to</h1>
          <span className="">
            <div className="h-1 md:h-2 w-1/2 bg-custom"></div>
            <h1 className="uppercase  font-extrabold tracking-wide text-3xl md:text-5xl">
              watcher
            </h1>
          </span>
        </div>
        {/* <Logo /> */}
        <p className="font-semibold text-slate-300">
          Entertainment Media Recommendation System <br className="sm:hidden" />
          and Community 📀.
        </p>
      </div>
    </div>
  );
};
