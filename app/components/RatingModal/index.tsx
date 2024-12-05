import { palatte } from "@/constant/palatte";
import { MediaInfoProps } from "@/wrapper/media-info";
import {
  Badge,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useToast,
} from "@chakra-ui/react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isLoading: boolean;
  handleOnSubmit: () => void;
  handleOnClearRating: () => void;
  setRating: (rating: number) => void;
  rating: number;
}
export const RatingModal = ({
  isOpen,
  onClose,
  title,
  isLoading,
  handleOnSubmit,
  rating,
  setRating,
  handleOnClearRating,
}: RatingModalProps) => {
  const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rating</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={"column"}>
            <Text>
              What you think about{" "}
              <span className="font-semibold">{title}</span>
            </Text>
            <Box className="px-2">
              <Slider
                defaultValue={rating}
                min={1}
                max={10}
                step={1}
                size="lg"
                onChange={(v) => setRating(v)}
              >
                {scale.map((value, index: number) => (
                  <SliderMark
                    value={value}
                    mt="4"
                    ml="-1.5"
                    fontSize="sm"
                    key={index}
                  >
                    {value}
                  </SliderMark>
                ))}
                <SliderTrack bg={"blue.100"} height={3}>
                  <SliderFilledTrack bg={palatte.bgGradient} />
                </SliderTrack>
                <SliderThumb
                  boxSize={4}
                  // className="!bg-[#032541]"
                />
              </Slider>
            </Box>
            <Text
              className="text-end mt-4 text-secondary text-sm underline hover:text-primary cursor-pointer"
              onClick={handleOnClearRating}
            >
              Clear my rating
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter className="space-x-2 mt-4">
          <Button
            bgColor={palatte.darkBlue}
            mr={3}
            onClick={onClose}
            size={"sm"}
            color={"white"}
          >
            CANCLE
          </Button>
          <Button
            size={"sm"}
            color={"white"}
            bgColor={palatte.darkBlue}
            mr={3}
            isLoading={isLoading}
            onClick={handleOnSubmit}
          >
            SUBMIT
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
