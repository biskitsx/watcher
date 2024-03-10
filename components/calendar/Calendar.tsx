"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import listPlugin from "@fullcalendar/list
import listPlugin from "@fullcalendar/list";
import { MediaInfoProps } from "@/wrapper/handled";
interface CalendarProp {
  items: MediaInfoProps[];
}

export default function Calendar({ items }: CalendarProp) {
  const eventsItem = items.map((item) => {
    return {
      title: item.title,
      allDay: false,
      date: item.release_date,
    };
  });
  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      // weekends={false}
      // events={[
      //   { title: "Spaceman", date: "2024-03-01", backgroundColor: "#1CBEC8" },
      //   {
      //     title: "Code 8 Part",
      //     date: "2024-03-02",
      //     allDay: false,
      //   },
      //   {
      //     title: "Spiderman",
      //     date: "2024-03-02",
      //     allDay: false,
      //     editable: true,
      //     url: "movies",
      //   },
      // ]}
      events={eventsItem}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridDay,dayGridWeek,dayGridMonth,listWeek",
      }}
    />
  );
}
