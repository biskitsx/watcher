import { GetReviewByMedia } from "@/app/api/review/actions";
import { getRandomAvatar } from "@/constant/random_avatar";
import { MediaInfoProps } from "@/wrapper/media-info";
import { Review } from "@prisma/client";
import type { StatisticProps } from "antd";
import CountUp from "react-countup";

import { Modal, Avatar, Card, Empty, Spin, Button } from "antd";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { StarIcon, Users, UsersIcon } from "lucide-react";
import { palatte } from "@/constant/palatte";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  openCreateReviewModal: () => void;
  media: MediaInfoProps;
}

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

export const ReviewModal = ({
  isOpen,
  onClose,
  openCreateReviewModal,
  media,
}: ReviewModalProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchReviews = async () => {
        const newReviews = await GetReviewByMedia(String(media.id), media.type);
        setReviews(newReviews);
      };
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="space-y-4">
        <span className="text-xl font-semibold items-center flex gap-2">
          Reviews from communities{" "}
          <StarIcon fill={palatte.primary} stroke={palatte.primary} size={24} />
        </span>

        <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-scroll">
          {loading ? (
            <Spin />
          ) : reviews.length !== 0 ? (
            reviews.map((review) => (
              <Card style={{ minWidth: 300 }} key={review.id}>
                <div className="w-full rounded-md flex gap-4 flex-col ">
                  <div className="flex flex-row gap-4 items-center">
                    <Avatar src={getRandomAvatar(review.userId)} />
                    <div className="space-y-0">
                      <h1 className="font-bold text-lg">{review.title}</h1>
                      <p className="text-xs">
                        {formatDistanceToNow(new Date(review.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-black ">{review.content}</p>
                </div>
              </Card>
            ))
          ) : (
            <Empty
              className="!my-4"
              description="Be the first person to write a review!"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className=" font-medium">
            <CountUp end={reviews.length} separator="," />
            <span className=""> reviews</span>
          </div>
          <Button type="primary" onClick={openCreateReviewModal}>
            Review Now!
          </Button>
        </div>
      </div>
    </Modal>
  );
};
