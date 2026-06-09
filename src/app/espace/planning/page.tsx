"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

export default function Planning() {
  // Pour l'instant, données fictives.on va les récupérer plus tard grace au backend
  const [events] = useState([
    {
      title: "Réunion de direction",
      start: "2026-06-03T09:00:00",
      end: "2026-06-03T11:00:00",
      backgroundColor: "#0f2e25",
      borderColor: "#0f2e25",
    },
    {
      title: "Formation comptabilité",
      start: "2026-06-04T14:00:00",
      end: "2026-06-04T16:30:00",
      backgroundColor: "#436851",
      borderColor: "#436851",
    },
    {
      title: "Atelier digital",
      start: "2026-06-05T10:00:00",
      end: "2026-06-05T12:00:00",
      backgroundColor: "#2f8765",
      borderColor: "#2f8765",
    },
  ]);

  return (
    <div className="mx-auto max-w-6xl p-8">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0f2e25]">
          Planning
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Visualisez les disponibilités des salles
        </p>
      </div>

      {/* Carte qui contient le calendrier */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={frLocale}
          firstDay={1}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
          }}
          slotMinTime="07:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          weekends={false}
          events={events}
          height="auto"
          eventClick={(info) => {
            alert(
              `Événement : ${info.event.title}\n` +
              `Début : ${info.event.start?.toLocaleString("fr-FR")}\n` +
              `Fin : ${info.event.end?.toLocaleString("fr-FR")}`
            );
          }}
        />
      </div>
    </div>
  );
}



