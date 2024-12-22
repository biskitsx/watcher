"use server";

import prisma from "@/prisma";
import bcrypt from "bcryptjs";

export interface SignUpProps {
  email: string;
  password: string;
  name: string;
}

export const SignUp = async (req: SignUpProps) => {
  try {
    const isEmailAlreadyExists = await prisma.user.findFirst({
      where: {
        email: req.email,
      },
    });

    if (isEmailAlreadyExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(req.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: req.email,
        password: hashedPassword,
        name: req.name,
      },
    });

    return newUser;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
