import { LoginForm } from "@/components/auth/LoginForm";
import { getPopularMovies } from "@/app/api/movie/actions";

export default async function SignIn() {
  const medias = await getPopularMovies();
  const firstMedia = medias[0];
  return <LoginForm bgImage={firstMedia.backdrop_path} />;
}
