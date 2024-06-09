import { format } from "date-fns";

export const formatTheDate = (date: string) => {
    let formattedDate = "";
    if (date !== "") {
      const newDate = new Date(date);
      formattedDate = format(newDate, "dd MMMM yyyy");
    }
    return formattedDate
}