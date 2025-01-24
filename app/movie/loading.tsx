"use server";
import { MediaSliderLoading } from "@/app/components/Loading/MediaSlider";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { MediaCarousel } from "../components/Loading/MediaCarousel";

const Loading = () => {
  return (
    <PageContainer>
      <MediaCarousel />
      <Container>
        <MediaSliderLoading />
        <MediaSliderLoading isLong />
        <MediaSliderLoading />
        <MediaSliderLoading />
      </Container>
    </PageContainer>
  );
};

export default Loading;
