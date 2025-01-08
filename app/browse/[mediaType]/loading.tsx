"use server";
import { MediaSliderLoading } from "@/app/components/Loading/MediaSlider";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Input, Select } from "antd";
import { SearchIcon } from "lucide-react";

const Loading = () => {
  return (
    <PageContainer className="pt-4">
      <Container>
        <div className="flex flex-col gap-2 rounded-md !my-4">
          <div className="flex gap-2 items-center text-2xl">
            <div className="bg-secondary h-6 w-[5px]" />
            <div className="flex gap-2 items-center">
              <h1 className="font-bold text-3xl">Browse</h1>
              <Select
                className="!gap-2 !font-bold"
                style={{ width: 120 }}
                variant="filled"
              />
            </div>
          </div>
          <Input
            variant="filled"
            prefix={<SearchIcon size={14} stroke="gray" />}
            placeholder="Search"
            size="large"
            className="!gap-2 !flex !shadow-md bg"
            allowClear
          />
        </div>
        <MediaSliderLoading isLong />
        <MediaSliderLoading />
        <MediaSliderLoading />
        <MediaSliderLoading />
      </Container>
    </PageContainer>
  );
};

export default Loading;
