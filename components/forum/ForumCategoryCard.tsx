interface ForumCategoryCardProps {
  category: string;
  cover: string;
}

export const ForumCategoryCard: React.FC<ForumCategoryCardProps> = ({
  category,
  cover,
}: ForumCategoryCardProps) => {
  return (
    <div className="shadow-md w-full flex overflow-hidden bg-base-200 relative cursor-pointer transition-all duration-300 ForumCategoryCard">
      <img src={cover} alt={cover} className="brightness-50" />
      <div className="absolute inset-0 flex justify-center items-center">
        <h2 className="text-base-100 text-2xl brightness-100">{category}</h2>
      </div>
    </div>
  );
};
