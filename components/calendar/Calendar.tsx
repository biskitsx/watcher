"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import listPlugin from "@fullcalendar/list
import listPlugin from "@fullcalendar/list";

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      //   weekends={false}
      events={[
        { title: "event 1", date: "2024-03-01" },
        { title: "event 2", date: "2024-03-02" },
        {
          title: "Meeting",
          start: "2024-03-12T14:30:00",
          extendedProps: {
            status: "done",
          },
        },
      ]}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridDay,dayGridWeek,dayGridMonth,listWeek",
      }}
    />
  );
}
