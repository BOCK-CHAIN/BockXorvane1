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

export const getUserByEmail = async (email: string) => {  
  try {
    const user = await db.authDetials.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error: any) {
    return null;
  }
}

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
    const result = await checkUser(email,password);
    console.log("result",result)
    if(!result.success){
      return {
        success: false,
        message: result.message,
      };
    }
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    return {
      success: true
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export const deleteNotification = async (id: string) => {
  try{
    await db.notification.delete({
      where:{
        id: id
      }
    })
  }catch(err){
    return;
  }
}

export const deleteAllNotifications = async (agencyId: string) => {  
  try{
    await db.notification.deleteMany({
      where:{
        agencyId: agencyId
      }
    })
  }catch(err){
    return;
  }

}