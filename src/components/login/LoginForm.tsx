"use client";

import { loginAction } from "@/actions/server-actions/actions-auth";
import { useFeedback } from "@/context/FeedbackContext";
import { LoginSchema } from "@/schema/login";
import { redirect } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";

export default function LoginForm() {
  const { showToast, isLoading, nowLoading, stopLoading } = useFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();

  const [warning, setWarning] = useState<string>("");

  const onSubmit = async (data: LoginSchema) => {
    nowLoading();

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const res = await loginAction(formData);

    if (res.success) {
      showToast({
        severity: "success",
        summary: "Welcome",
        detail: "Hello " + data.username,
        position: "top-center",
      });
      stopLoading();
      redirect("/");
    } else {
      showToast({
        severity: "error",
        summary: "Ups Something's Wrong",
        detail: res.message,
        position: "bottom-right",
      });
      setWarning(res.message);
    }

    stopLoading();
  };

  return (
    <form
      className="w-2xs gap-4 flex flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <InputText
            unstyled={true}
            type="text"
            id="username"
            className="border rounded-full px-3 py-1"
            {...register("username", { required: "Username is Required" })}
          />
          {errors.username && (
            <Message
              unstyled={true}
              severity="contrast"
              text={errors.username?.message}
              className="text-red-400 text-right items-center"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password text-bold" className="font-semibold">
            Password
          </label>
          <InputText
            unstyled={true}
            type="password"
            id="password"
            className="border rounded-full px-3 py-1"
            {...register("password", { required: "Password is Required" })}
          />
          {errors.password && (
            <Message
              unstyled={true}
              severity="contrast"
              text={errors.password?.message}
              className="text-red-400 text-right items-center"
            />
          )}
        </div>
      </div>
      <Button
        loading={isLoading}
        unstyled={true}
        type="submit"
        label="Login"
        className="border border-black rounded-full py-1 bg-black/50 text-white"
        disabled={isLoading}
      />
      {warning && (
        <Message
          unstyled={true}
          severity="contrast"
          text={warning}
          className="text-red-400 text-right items-center"
        />
      )}
    </form>
  );
}
