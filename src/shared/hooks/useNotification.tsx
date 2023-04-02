import { NotificationProps, notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconExclamationMark,
  IconInfoSmall,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

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
  const longRemainingIds = useRef<string[]>([]);

  const notifySuccess = ({
    title,
    message,
    options = {},
  }: OptionsForSuccess) => {
    let id;
    if (options.autoClose === false || typeof options.autoClose === "number") {
      id = getRandomId();
      longRemainingIds.current.push(id);
    }

    notifications.show({
      title,
      message,
      icon: <IconCheck size={18} />,
      color: "teal",
      styles: { icon: { height: 24, width: 24 } },
      id,
      ...options,
    });
  };

  const notifyError = ({
    title,
    message = "エラーが発生しました。",
    options = {},
  }: OptionsForError = {}) => {
    let id;
    if (options.autoClose === false || typeof options.autoClose === "number") {
      id = getRandomId();
      longRemainingIds.current.push(id);
    }

    notifications.show({
      title,
      message,
      icon: <IconExclamationMark size={18} />,
      color: "red",
      styles: { icon: { height: 24, width: 24 } },
      id,
      ...options,
    });
  };

  const notifyInfo = ({ title, message, options = {} }: OptionsForSuccess) => {
    let id;
    if (options.autoClose === false || typeof options.autoClose === "number") {
      id = getRandomId();
      longRemainingIds.current.push(id);
    }

    notifications.show({
      title,
      message,
      icon: <IconInfoSmall size={18} />,
      color: "blue",
      styles: { icon: { height: 24, width: 24 } },
      id,
      ...options,
    });
  };

  const router = useRouter();

  // すぐに閉じない通知がページ遷移時にまだ残っていた場合、閉じる
  useEffect(() => {
    return () => {
      for (const id of longRemainingIds.current) {
        notifications.hide(id);
      }
      longRemainingIds.current = [];
    };
  }, [router.asPath]);

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
  };
};

const getRandomId = () => Math.random().toString(32).substring(2);
