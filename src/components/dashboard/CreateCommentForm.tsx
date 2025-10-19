import { useFeedback } from "@/context/FeedbackContext";
import { CreateCommentSchema } from "@/schema/createComment";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from "primereact/message";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateCommentForm(): ReactNode {
  const { hideDialog, showToast, isLoading, nowLoading, stopLoading } =
    useFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentSchema>();

  const onSubmit = async (data: CreateCommentSchema) => {
    nowLoading();

    const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());

    if (res) {
      showToast({
        severity: "success",
        summary: "Comment Created Successfully",
        detail: res.body,
        position: "top-center",
      });
    } else {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        position: "top-center",
      });
    }

    stopLoading();
    hideDialog();
  };

  return (
    <form
      className="w-2xs gap-8 flex flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="username" className="font-semibold">
            Name
          </label>
          <InputText
            type="text"
            id="name"
            {...register("name", { required: "Name is Required" })}
          />
          {errors.name && (
            <Message
              unstyled={true}
              severity="contrast"
              text={errors.name?.message}
              className="text-red-400 text-right items-center"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password text-bold" className="font-semibold">
            Email
          </label>
          <InputText
            type="email"
            id="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <Message
              unstyled={true}
              severity="contrast"
              text={errors.email?.message}
              className="text-red-400 text-right items-center"
            />
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password text-bold" className="font-semibold">
            Body
          </label>
          <InputTextarea
            rows={8}
            cols={30}
            id="body"
            {...register("body", { required: "Body is Required" })}
          />
          {errors.body && (
            <Message
              unstyled={true}
              severity="contrast"
              text={errors.body?.message}
              className="text-red-400 text-right items-center"
            />
          )}
        </div>
      </div>
      <Button label="Submit" type="submit" loading={isLoading} />
    </form>
  );
}
