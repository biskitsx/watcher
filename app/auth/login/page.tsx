"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { LoginForm } from "@/components/auth/LoginForm";

export default function SignIn() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
