import Calendar from "@/components/calendar/Calendar";
import { Container } from "@/components/layout/Container";
import { getUpcomingMovies } from "@/action/movies";

import React from "react";
import { BreadcrumbApp } from "@/components/BreadCrumb";

async function Page() {
  const upcomingMovies = await getUpcomingMovies(12);

  return (
    <Container>
      <BreadcrumbApp />
      <Calendar items={upcomingMovies} />
    </Container>
  );
}

export default Page;
