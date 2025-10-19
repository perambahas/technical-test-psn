"use client";
import { createContext, useContext, ReactNode, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

type ToastPositionType =
  | "center"
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-center";

type FeedbackContextType = {
  showDialog: ({
    content,
    header,
  }: {
    content: ReactNode;
    header?: string;
  }) => void;
  hideDialog: () => void;
  showToast: (options: {
    severity?: "success" | "info" | "warn" | "error";
    summary?: string;
    detail?: string;
    life?: number;
    position?: ToastPositionType;
  }) => void;
  isLoading: boolean;
  nowLoading: () => void;
  stopLoading: () => void;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  //DIALOG CONTEXT
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const [dialogHeader, setDialogHeader] = useState<string>("");

  const showDialog = ({
    content,
    header = "",
  }: {
    content: ReactNode;
    header?: string;
  }) => {
    setDialogHeader(header);
    setDialogContent(content);
    setDialogVisible(true);
  };
  const hideDialog = () => setDialogVisible(false);

  //TOAST CONTEXT
  const toast = useRef<Toast>(null);
  const [toastPosition, setToastPosition] =
    useState<ToastPositionType>("top-right");

  const showToast: FeedbackContextType["showToast"] = (options) => {
    setToastPosition(options.position ?? "top-right");
    toast.current?.show({
      severity: options.severity ?? "info",
      summary: options.summary ?? "Info",
      detail: options.detail ?? "",
      life: options.life ?? 2000,
    });
  };

  //LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  const nowLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <FeedbackContext.Provider
      value={{
        showDialog,
        hideDialog,
        showToast,
        isLoading,
        nowLoading,
        stopLoading,
      }}
    >
      <Dialog header={dialogHeader} visible={dialogVisible} onHide={hideDialog}>
        {dialogContent}
      </Dialog>
      <Toast ref={toast} position={toastPosition} />
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const ctx = useContext(FeedbackContext);
  if (!ctx)
    throw new Error("useFeedback must be used within a FeedbackProvider");
  return ctx;
};
