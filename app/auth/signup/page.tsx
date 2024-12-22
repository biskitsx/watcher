import { getPopularMovies } from "@/app/api/movie/actions";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default async function SignIn() {
  const medias = await getPopularMovies();
  const selectedMedia = medias[1];
  return <SignUpForm bgImage={selectedMedia.backdrop_path} />;
}
