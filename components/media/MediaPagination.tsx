import { Card } from "antd";
import { MediaCard } from "./MediaCard";
import { Container } from "../layout/Container";

interface MediaPaginationProps {
  items: any[];
  baseUrl: string;
  name: string;
  type: "movies" | "series" | "anime";
}
export const MediaPagination = ({
  items,
  baseUrl,
  name,
}: MediaPaginationProps) => {
  // console.log(items);
  return (
    <Container>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{name} ...</h1>
        <div className="py-2">
          <div className="overflow-x-auto  whitespace-nowrap space-x-5 align-top bg-scroll scrollable-element">
            {items.map((media: any, index: number) => (
              <MediaCard
                cover={`${baseUrl}/${media.poster_path}`}
                key={index}
                title={media.title ? media.title : media.name}
                release_date={
                  media.release_date ? media.release_date : media.first_air_date
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
