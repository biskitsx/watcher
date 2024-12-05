import { FcGoogle } from "react-icons/fc";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { toastConfig } from "../toast/ToastConfig";
import Link from "next/link";
type FieldType = {
  email?: string;
  password?: string;
};

interface LoginFormProps {}
export const LoginForm = ({}: LoginFormProps) => {
  const router = useRouter();
  const toast = useToast();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      toast({
        title: "Logging in...",
        status: "loading",
        ...toastConfig,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result) {
        if (result.error) {
          toast({
            title: "Login Failed",
            status: "error",
            ...toastConfig,
          });
          console.error(result.error);
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
      console.log("error", error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=" rounded-md shadow-xl bg-white w-full mx-auto mt-24  overflow-hidden flex flex-row max-w-[800px]">
      <div className="w-1/2 bg-custom overflow-hidden hidden md:block"></div>
      <div className="w-full p-8 md:w-1/2">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>
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
          <div className="mb-2">
            Dont have an account?{" "}
            <Link href="/auth/signup" className="text-[#1CBEC8] font-semibold">
              Sign Up
            </Link>
          </div>
          <Form.Item>
            <div className="space-y-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                style={{ padding: "14px", height: "auto" }}
              >
                Sign in
              </Button>
              <Button
                type="default"
                className="w-full"
                size="large"
                style={{ padding: "14px", height: "auto" }}
                onClick={async () => {
                  toast({
                    title: "Logging in...",
                    status: "loading",
                    ...toastConfig,
                  });
                  await signIn("google", { callbackUrl: "/" });
                }}
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
