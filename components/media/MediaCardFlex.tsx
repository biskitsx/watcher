import { MediaInfoProps } from "@/wrapper/media-info";
import { MediaCard } from "./MediaCard";
import { Skeleton } from "antd";

interface MediaCardFlexProps {
  medias: MediaInfoProps[];
  isLoading: boolean;
}
export const MediaCardFlex = ({ medias, isLoading }: MediaCardFlexProps) => {
  const skeletonArray = Array.from({ length: 30 }, (_, idx) => idx);
  return (
    <div className="flex flex-wrap gap-6">
      {isLoading
        ? skeletonArray.map((_, idx) => (
            <Skeleton.Image
              key={idx}
              className="h-[150px] md:h-[210px] w-[100px] md:w-[140px]"
              style={{ width: "140px", height: "210px" }}
              active
            />
          ))
        : medias &&
          medias.map((media, idx) => <MediaCard key={idx} media={media} />)}
    </div>
  );
};
