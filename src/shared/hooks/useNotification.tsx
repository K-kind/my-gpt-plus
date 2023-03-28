import { NotificationProps, notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconExclamationMark,
  IconInfoSmall,
} from "@tabler/icons-react";

type OptionsForSuccess = {
  title?: string;
  message: string;
  options?: Omit<NotificationProps, "title" | "message">;
};

type OptionsForError = {
  title?: string;
  message?: string;
  options?: Omit<NotificationProps, "title" | "message">;
};

export const useNotification = () => {
  const notifySuccess = ({
    title,
    message,
    options = {},
  }: OptionsForSuccess) => {
    notifications.show({
      title,
      message,
      icon: <IconCheck size={18} />,
      color: "teal",
      styles: { icon: { height: 24, width: 24 } },
      ...options,
    });
  };

  const notifyError = ({
    title,
    message = "エラーが発生しました。",
    options = {},
  }: OptionsForError = {}) => {
    notifications.show({
      title,
      message,
      icon: <IconExclamationMark size={18} />,
      color: "red",
      styles: { icon: { height: 24, width: 24 } },
      ...options,
    });
  };

  const notifyInfo = ({ title, message, options = {} }: OptionsForSuccess) => {
    notifications.show({
      title,
      message,
      icon: <IconInfoSmall size={18} />,
      color: "blue",
      styles: { icon: { height: 24, width: 24 } },
      ...options,
    });
  };

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
  };
};
