"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/template/shadcnblocs/button";
import { CalendarPlus, ClipboardList } from "lucide-react";

// Type pour décrire une réservation (utilisé plus tard avec l'API)
type Reservation = {
  idReservation: string;
  motif: string;
  dateReservation: string;
  heureDebut: string;
  heureFin: string;
  etatReservation: string;
};

export default function MesReservationsPage() {
  // Pour l'instant, liste vide. Plus tard : fetch depuis l'API.
  const [reservations] = useState<Reservation[]>([]);

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Titre */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0f2e25]">
          Mes réservations
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Consultez et gérez vos réservations
        </p>
      </div>

  
      <div className="rounded-lg border border-gray-200 bg-white">
        {reservations.length === 0 ? (
          // ===== EMPTY STATE =====
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <ClipboardList className="h-8 w-8 text-gray-500" />
            </div>

            
            <h2 className="text-lg font-semibold text-gray-900">
              Pas encore de réservations
            </h2>

            
            <p className="mt-2 max-w-sm text-sm text-gray-600">
              Vous n'avez aucune réservation pour le moment. Créez votre première
              demande de réservation pour commencer.
            </p>

            
            <Link href="/espace/nouvelle-reservation">
              <Button className="mt-6 bg-[#0F2E25] text-white hover:bg-[0F2E25]">
                <CalendarPlus className="mr-2 h-4 w-4 text-white" />
                Faire une réservation
              </Button>
            </Link>
          </div>
        ) : (

          <div className="p-6">
            <p className="text-sm text-gray-600">
              {reservations.length} réservation(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}