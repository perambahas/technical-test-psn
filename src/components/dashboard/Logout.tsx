"use client";

import { logoutAction } from "@/actions/server-actions/actions-auth";
import { useFeedback } from "@/context/FeedbackContext";
import { redirect } from "next/navigation";
import { Button } from "primereact/button";

export default function LogoutButton({ className }: { className?: string }) {
  const { showToast, isLoading, nowLoading, stopLoading } = useFeedback();

  const handleLogout = async () => {
    nowLoading();
    const res = await logoutAction();
    if (res.success) {
      showToast({
        severity: "success",
        summary: "Logout Success",
        detail: "You are logged out successfully",
      });
      stopLoading();
      redirect("/login");
    }

    stopLoading();
  };

  return (
    <Button
      loading={isLoading}
      className={className}
      label="Logout"
      severity="danger"
      onClick={handleLogout}
      icon="pi pi-sign-out"
    />
  );
}
