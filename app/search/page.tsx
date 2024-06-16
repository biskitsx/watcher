import { Container } from "@/components/layout/Container";
import { SearchPage } from "./_components/SearchPage";

export default async function Home() {
  return (
    <Container className="pt-6">
      <h1 className="text-3xl font-semibold">Search your interest</h1>
      <SearchPage />
    </Container>
  );
}
