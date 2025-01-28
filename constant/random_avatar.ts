export const getRandomAvatar = (seed: string) => {
  const image = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${seed}`;
  return image;
};
