"use client";
import { FloatButton } from "antd";

interface FloatFormProps {}
export const FloatForm = ({}: FloatFormProps) => {
  const formLink = "https://forms.gle/UwAKZA8f6eVJJKAq7";
  const onClickForm = () => {
    window.open(formLink, "_blank");
  };
  return (
    <FloatButton
      onClick={onClickForm}
      tooltip={<div>Form</div>}
      type="primary"
    />
  );
};
