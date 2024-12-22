"use client";

import { Logo } from "@/components/Logo";
import { useToast } from "@chakra-ui/react";
import { Button } from "antd";
import { signIn } from "next-auth/react";
import { toastConfig } from "@/components/toast/ToastConfig";
import { FcGoogle } from "react-icons/fc";

interface LoginPageProps {}
export const LoginPage = ({}: LoginPageProps) => {
  const toast = useToast();
  return (
    <div>
      <div>
        {/* <Logo /> */}
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
          <div className="w-full flex flex-row items-center justify-center gap-2 uppercase font-medium">
            <FcGoogle size={"24"} />
            Sign in with Google
          </div>
        </Button>
      </div>
    </div>
  );
};
