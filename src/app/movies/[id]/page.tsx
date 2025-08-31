import MovieDetail from "./MovieDetail";

interface Params {
  params: { id: string };
}

export default function MoviePage({ params }: Params) {
  const movieId = parseInt(params.id, 10);

  return <MovieDetail movieId={movieId} />;
}
