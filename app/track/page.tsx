import { Container } from "@/components/layout/Container";
import { BreadcrumbApp } from "@/components/BreadCrumb";
import { TrackTable } from "@/components/table/TrackTable";
import { getUserWatchList } from "@/app/api/media/actions";
import { Suspense } from "react";

async function Page() {
  const data = await getUserWatchList();
  return (
    <Container>
      <div className="flex gap-2 flex-col">
        <BreadcrumbApp />
        <h1 className="text-3xl font-semibold">Watch list</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackTable media={data || []} />
      </Suspense>
    </Container>
  );
}

export default Page;
