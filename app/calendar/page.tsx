import Calendar from "@/components/calendar/Calendar";
import { Container } from "@/components/layout/Container";
import { getTrendingMovies, getUpcomingMovies } from "@/action/movies";

import React from "react";

async function Page() {
  const upcomingMovies = await getUpcomingMovies(12);

  return (
    <Container>
      <Calendar items={upcomingMovies} />
    </Container>
  );
}

export default Page;
