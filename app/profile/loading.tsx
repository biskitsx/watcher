import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { RadialProgress } from "@/components/media/RadialProgress";
import { MotionFaded } from "@/components/motion/MotionFaded";
import { Avatar } from "antd";

const Loading = () => {
  <PageContainer className="gap-0">
    {/* <div className=" bg-custom"> */}
    <div className=" bg-custom">
      <MotionFaded>
        <Container className="py-12 md:py-24 flex flex-col md:flex-row items-center">
          <div>
            <Avatar size={120} />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="text-3xl font-semibold text-center md:text-start">
              hello,
            </div>
            <div className="flex gap-4 justify-center md:justify-start w-full">
              {/* {scores.map((score, index) => ( */}
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={-1}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={-1} />
                </div>
                <p className="text-white font-medium text-xs md:text-base">
                  Average <br />
                  Movie Score
                </p>
                <div className="h-full w-[2px] bg-white rounded-md" />
              </div>
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={-1}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={-1} />
                </div>
                <p className="text-white font-medium text-xs md:text-base">
                  Average <br />
                  Serie Score
                </p>
                <div className="h-full w-[2px] bg-white rounded-md" />
              </div>
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={-1}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={-1} />
                </div>
                <p className="text-white font-medium text-xs md:text-base">
                  Average <br />
                  Anime Score
                </p>
              </div>
              {/* ))} */}
            </div>
          </div>
        </Container>
      </MotionFaded>
    </div>
  </PageContainer>;
};
export default Loading;
