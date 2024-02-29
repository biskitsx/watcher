interface MediaCardProps {
  cover: string;
  title: string;
  release_date: string;
}
export const MediaCard = ({ cover, title, release_date }: MediaCardProps) => {
  return (
    <div className="w-[180px] rounded-md hover:scale-105 transition-all inline-block cursor-pointer align-top">
      <img src={cover} alt={cover} className="rounded-md shadow-md" />
      <div className="py-2 px-1">
        <h3 className="text-wrap">{title}</h3>
        <p>{release_date}</p>
      </div>
    </div>
  );
};
