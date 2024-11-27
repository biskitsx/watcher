import { Container } from "@/components/layout/Container";
import { Button } from "antd";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { GenreStatsRadarChart } from "./GenreStatsRadarChart";

export default function Overview() {
  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold">Stats</h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Watchlist</h1>
        <Link href="/search">
          <Button
            icon={<PlusIcon />}
            type="primary"
            size="large"
            className="!flex  !font-bold !uppercase !items-center"
          >
            Add
          </Button>
        </Link>
      </div>
      <GenreStatsRadarChart />
    </Container>
  );
}
