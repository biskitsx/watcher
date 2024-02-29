"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      //   weekends={false}
      events={[
        { title: "event 1", date: "2024-02-01" },
        { title: "event 2", date: "2024-02-02" },
      ]}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridWeek,dayGridDay,dayGridMonth",
      }}
    />
  );
}
