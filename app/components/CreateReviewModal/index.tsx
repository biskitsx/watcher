import { Modal, Button, Flex, Form, Input, Select, Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { CreateReview } from "@/app/api/review/actions";
import { MediaInfoProps } from "@/wrapper/media-info";
import { useState } from "react";

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaInfoProps;
}
const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

export const CreateReviewModal = ({
  isOpen,
  onClose,
  media,
}: CreateReviewModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await CreateReview({
        content: values.content,
        title: values.title,
        point: values.feeling,
        mediaId: String(media.id),
        mediaType: media.type,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
        style={{ paddingBlock: 32 }}
        className="!py-0 !my-0"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item>
          <h1 className="text-3xl font-bold">Create a review</h1>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item
          name="feeling"
          label="Your Feeling"
          layout="horizontal"
          rules={[{ required: true }]}
        >
          <Rate character={({ index = 0 }) => customIcons[index + 1]} />
        </Form.Item>

        <Form.Item>
          <Flex justify="end" gap="small">
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button danger onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
