import { format as dateFnsFormat } from "date-fns";
import { ja } from "date-fns/locale";

export const format = (date: Date | number, fmt: string) => {
  return dateFnsFormat(date, fmt, { locale: ja });
};
