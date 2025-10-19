"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const creds = {
  username: "admin",
  password: "$2a$12$vE7QPLkCECpRqezSulUYv.qAsGDuI9/CZjS66CoKk0NpnWIyBI/ji",
};

export const loginAction = async (data: FormData) => {
  const username = data.get("username");
  const password = data.get("password");

  if (username != creds.username)
    return {
      success: false,
      message: "Username Not Found",
      code: 404,
    };

  const checkPassword = await bcrypt.compare(
    password as string,
    creds.password
  );

  if (!checkPassword) {
    return {
      success: false,
      message: "Incorect Password",
      code: 401,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: "session",
    value: JSON.stringify({ username }),
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    success: true,
    message: "Login Success",
    code: 200,
  };
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  const session = await cookieStore.get("session");
  if (!session) {
    return {
      success: false,
      message: "Session Not Found",
      code: 404,
    };
  }
  cookieStore.delete("session");
  return {
    success: true,
    message: "Logout Success",
    code: 200,
  };
};
