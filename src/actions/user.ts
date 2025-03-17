"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { signInSchema } from "@/types/signInSchema";
import bcryptjs from "bcryptjs";

export const checkUser = async (email: string, password: string) => {
  try {
    const existedUser = await db.authDetials.findUnique({
      where: {
        email,
      },
    });
    if (!existedUser) {
      return {
        success: false,
        message: "User not found.",
      };
    }
    
    if (!existedUser.password) {
      return {
        success: false,
        message: "Please provide a password.",
      };
    }

    const isPasswordMatches = await bcryptjs.compare(
      password,
      existedUser.password
    );
    
    if (!isPasswordMatches) {
      return {
        success: false,
        message: "Password is incorrect.",
      };
    }

    const user = await db.user.findUnique({
      where:{
        email: email
      }
    })
    return {
      success: true,
      data: {...existedUser,...user},
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAuthuser = async (userId: string) => {
  try {
    const user = await db.authDetials.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error: any) {
    return null;
  }
};

export const addUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const existedUser = await db.authDetials.findUnique({
      where: {
        email,
      },
    });

    if (existedUser) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await db.authDetials.create({
      data: {
        role: "NONE",
        email,
        password: hashedPassword,
        name: name,
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export async function signInUser(email: string, password: string) {
  try {
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    };
  }
}
