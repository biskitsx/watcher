"use client";

import { FcGoogle } from "react-icons/fc";
import type { FormProps } from "antd";
import { Alert, Button, Checkbox, Form, Image, Input } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, useToast } from "@chakra-ui/react";
import { toastConfig } from "../toast/ToastConfig";
import Link from "next/link";
import { useState } from "react";
type FieldType = {
  email?: string;
  password?: string;
};

interface LoginFormProps {
  bgImage: string;
}
export const LoginForm = ({ bgImage }: LoginFormProps) => {
  const router = useRouter();
  const toast = useToast();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setButtonLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result) {
        if (result.error) {
          throw new Error(result.error);
        } else {
          toast({
            title: "Login Successfully",
            status: "success",
            ...toastConfig,
          });
          router.push("/");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setButtonLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onGoogleSignIn = async () => {
    toast({
      title: "Logging in...",
      status: "loading",
      ...toastConfig,
    });
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className=" flex h-screen">
      <div className="brightness-50 w-full hidden md:block">
        <img src={bgImage} className="h-full object-cover" />
      </div>
      <div className="w-[1000px] p-12  flex items-center">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="!w-full !flex !flex-col"
        >
          <span className="self-center mb-6">
            <div className="h-[6px] w-1/2 bg-custom"></div>
            <h1 className=" font-extrabold tracking-wide uppercase text-2xl">
              Watcher
            </h1>
          </span>
          <h1 className="text-xl  text-center">Welcome back!</h1>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                type: "string",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              // closable
              className="!mb-6"
            />
          )}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
            style={{ padding: "14px", height: "auto" }}
            loading={buttonLoading}
          >
            Sign in
          </Button>
          <div className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[#1CBEC8] font-semibold">
              Sign Up
            </Link>
          </div>
          <div className="flex items-center gap-2 py-6">
            <div className="h-[1px] bg-slate-300 w-full" />
            <p className="text-black">or</p>
            <div className="h-[1px] bg-slate-300 w-full" />
          </div>
          <Form.Item>
            <div className="space-y-2">
              <Button
                type="default"
                className="w-full"
                size="large"
                style={{ padding: "14px", height: "auto" }}
                onClick={onGoogleSignIn}
              >
                <div className="w-full flex flex-row items-center justify-center gap-2">
                  <FcGoogle size={"24"} />
                  Sign in with Google
                </div>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
