import { Carousel } from "antd";
import { MediaInfoProps } from "@/wrapper/media-info";
import { TypeWrite } from "./TypeWriter";
import { MotionFaded } from "../motion/MotionFaded";
import { TbTrack } from "react-icons/tb";

interface HomeCarouselProps {
  items: MediaInfoProps[];
}

export const HomeCarousel = ({ items }: HomeCarouselProps) => {
  return (
    <div className="relative max-h-[60vh]  overflow-hidden">
      <div className="sm:hidden">
        <Carousel autoplay className="shadow-md brightness-[0.3] max-h-[60vh]">
          {items.map((movie, index: number) => (
            <div key={index} className="relative">
              <img src={movie.poster_path} alt={movie.title} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="hidden sm:block">
        <Carousel autoplay className="shadow-md brightness-[0.3]  max-h-[60vh]">
          {items.map((movie, index: number) => (
            <div key={index} className="relative">
              <img src={movie.backdrop_path} alt={movie.title} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="absolute w-full top-1/2 z-20 -translate-y-1/2 text-base-100 max-h-[60vh] text-center tracking-wider">
        <MotionFaded>
          <div className="flex flex-col gap-8 z-20">
            <div className="text-3xl md:text-5xl font-extrabold space-y-2">
              <div className="text-blue-200 tracking-wide">
                <TypeWrite />
              </div>
              <div className="flex justify-center items-end gap-2 ">
                <h1>Tracking Service </h1>
                <TbTrack className="text-orange-200" />
              </div>
            </div>
            <div className="md:text-xl">
              <h3>
                <b className="text-orange-200">Track</b> what you watch.
              </h3>
              <h3>
                <b className="text-blue-200">Discover</b> new shows and movies.
              </h3>
              <h3>
                Get <b className="text-purple-200">personalized</b>{" "}
                recommendations.
              </h3>
            </div>
          </div>
        </MotionFaded>
      </div>
      {/* <div className="absolute w-full top-1/2 text-base-100 max-h-[60vh] text-center tracking-wider">
        <div className="text-5xl font-extrabold flex justify-center items-end gap-2 text-white">
          <h1 className="text-2xl md:text-5xl font-extrabold">Welcome to</h1>
          <span>
            <div className="h-1 md:h-2 w-1/2 bg-custom"></div>
            <h1 className="uppercase  font-extrabold tracking-wide text-3xl md:text-5xl">
              watcher
            </h1>
          </span>
        </div>
        <p className="font-semibold text-slate-300">
          Entertainment Media Recommendation System <br className="sm:hidden" />
          and Community 📀.
        </p>
      </div> */}
    </div>
  );
};
