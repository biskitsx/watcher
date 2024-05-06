import { Progress, ProgressProps } from "antd";
import { format } from "date-fns";
import { RadialProgress } from "./RadialProgress";
import { MediaInfoProps } from "@/wrapper/media-info";

interface MediaCardProps {
  media: MediaInfoProps;
}
const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

export const MediaCard = ({ media }: MediaCardProps) => {
  const date = new Date(media.release_date);
  const formattedDate = format(date, "dd MMMM yyyy");
  return (
    <div className="w-[140px] rounded-md  inline-block cursor-pointer align-top space-y-3">
      <div className="relative">
        <div className="rounded-md shadow-md overflow-hidden relative">
          <img
            src={media.poster_path}
            alt={media.poster_path}
            className="hover:scale-105 transition-all "
          />
        </div>
        <RadialProgress
          value={media.vote_average * 10}
          className="absolute -bottom-4 left-2"
        />
      </div>
      <div className="py-2 px-1">
        <h3 className="text-wrap font-semibold">{media.title}</h3>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};
