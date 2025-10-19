"use client";

import { useFeedback } from "@/context/FeedbackContext";
import { CommentType } from "@/types/comment.type";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const DeleteDialog = ({ item }: { item: CommentType }) => {
  const { hideDialog, showToast, isLoading, nowLoading, stopLoading } =
    useFeedback();

  const onDelete = async () => {
    nowLoading();
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments/" + item.id,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());

    if (res) {
      showToast({
        severity: "success",
        summary: "Comment Deleted Successfully",
        position: "top-center",
      });
      hideDialog();
    } else {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        position: "top-center",
      });
    }

    stopLoading();
  };

  return (
    <div className="flex flex-col gap-8">
      <p>
        Are You Sure to <span className="text-red-600 font-bold"> DELETE</span>{" "}
        This Comment?
      </p>
      <div>
        <p>
          Comment ID: <span className="font-bold">{item.id}</span>
        </p>
        <p>
          Post ID: <span className="font-bold">{item.postId}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p>Name:</p>
          <InputText value={item.name} className="w-full" readOnly />
        </div>
        <div>
          <p>Email:</p>
          <InputText value={item.email} className="w-full" readOnly />
        </div>
        <div>
          <p>Body:</p>
          <InputTextarea
            value={item.body}
            className="w-full"
            readOnly
            rows={8}
            cols={30}
          />
        </div>
      </div>
      <div className="flex flex-row gap-8 self-end">
        <Button
          label="Delete"
          severity="danger"
          onClick={onDelete}
          loading={isLoading}
        />
        <Button
          label="Cancel"
          severity="info"
          onClick={() => hideDialog()}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default function DeleteComment(item: CommentType) {
  const { showDialog, isLoading } = useFeedback();

  const onDelete = () => {
    showDialog({
      content: <DeleteDialog item={item} />,
      header: "Delete Comment",
    });
  };

  return (
    <Button
      loading={isLoading}
      icon="pi pi-trash"
      rounded
      raised
      severity="danger"
      aria-label="Delete"
      onClick={onDelete}
    />
  );
}
