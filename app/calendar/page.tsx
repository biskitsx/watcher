import Calendar from "@/components/calendar/Calendar";
import { Container } from "@/components/layout/Container";
import { getUpcomingMovies } from "@/app/api/movie/actions";

import React from "react";
import { BreadcrumbApp } from "@/components/BreadCrumb";

async function Page() {
  const upcomingMovies = await getUpcomingMovies(12);

  return (
    <Container>
      <div className="flex gap-2 flex-col">
        <BreadcrumbApp />
        <h1 className="text-3xl font-semibold">Calendar</h1>
      </div>
      <Calendar items={upcomingMovies} />
    </Container>
  );
}

export default Page;
