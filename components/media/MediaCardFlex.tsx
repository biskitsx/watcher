import { MediaInfoProps } from "@/wrapper/media-info";
import { MediaCard } from "./MediaCard";
import { Skeleton } from "antd";

interface MediaCardFlexProps {
  medias: MediaInfoProps[];
  isLoading: boolean;
}
export const MediaCardFlex = ({ medias }: MediaCardFlexProps) => {
  return (
    <div className="flex flex-wrap gap-6">
      {medias.map((media, idx) => (
        <MediaCard key={idx} media={media} />
      ))}
    </div>
  );
};
