import { Carousel, Card, Button } from "antd";

interface MediaCarouselProps {
  items: any[];
}
export const MediaCarousel = ({ items }: MediaCarouselProps) => {
  return (
    <Carousel
      autoplay
      className="rounded-md overflow-hidden max-h-96 shadow-md"
    >
      {items.map((movie: any, index: number) => {
        if (movie.handled_data.backdrop_path) {
          return (
            <div key={index} className="relative">
              <img
                src={movie.handled_data.backdrop_path}
                alt={movie.handled_data.title}
                width={1920}
                height={1080}
              />
            </div>
          );
        }
      })}
    </Carousel>
  );
};
