import { format } from "date-fns";

export const formatTheDate = (date: string) => {
  let formattedDate = "";
  if (date !== "" && date !== null && date !== undefined) {
    const newDate = new Date(date);
    formattedDate = format(newDate, "d MMMM yyyy");
  }
  return formattedDate;
};
