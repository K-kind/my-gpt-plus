import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { OpenConfirmModal } from "@mantine/modals/lib/context";

type Options = {
  message: string;
  options?: Omit<OpenConfirmModal, "title">;
};

export const useModal = () => {
  const confirm = ({ message, options = {} }: Options) => {
    return new Promise<boolean>((resolve) => {
      openConfirmModal({
        children: <Text sx={{ whiteSpace: "pre-line" }}>{message}</Text>,
        title: "確認",
        confirmProps: { w: 105 },
        labels: { confirm: "OK", cancel: "キャンセル" },
        onCancel: () => resolve(false),
        onConfirm: () => resolve(true),
        onClose: () => resolve(false),
        zIndex: 1000,
        ...options,
      });
    });
  };

  return {
    confirm,
  };
};
