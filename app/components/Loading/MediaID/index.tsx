"use client";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { MediaSliderLoading } from "../MediaSlider";
import { MediaDetailLoading } from "./MediaDetailLoading";

interface LoadingMediaIDProps {}
export const LoadingMediaID = ({}: LoadingMediaIDProps) => {
  return (
    <PageContainer>
      <MediaDetailLoading />
      <Container>
        <MediaSliderLoading />
      </Container>
    </PageContainer>
  );
};
