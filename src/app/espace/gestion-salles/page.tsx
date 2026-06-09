"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/template/shadcnblocs/button";
import { Plus, Home } from "lucide-react";

// ===== TYPE =====
// Description d'une salle (utilisée plus tard quand on aura l'API)
type Salle = {
  idSalle: string;
  nomSalle: string;
  capacite: number;
  estBloquee: boolean;
};

export default function GestionSallesPage() {
  // Pour l'instant, liste vide. Plus tard : fetch depuis l'API.
  const [salles] = useState<Salle[]>([]);

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* ===== TITRE ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0f2e25]">
          Salles
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Liste des salles du centre intégré
        </p>
      </div>

      {/* ===== CARTE PRINCIPALE ===== */}
      {/* Selon qu'il y a ou non des salles, on affiche soit l'empty state, soit la liste */}
      <div className="rounded-lg border border-gray-200 bg-white">
        {salles.length === 0 ? (
          // ===== EMPTY STATE =====
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            {/* Icône dans un carré gris arrondi */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Home className="h-8 w-8 text-gray-500" />
            </div>

            {/* Titre */}
            <h2 className="text-lg font-semibold text-gray-900">
              Pas encore de salles
            </h2>

            {/* Description */}
            <p className="mt-2 max-w-sm text-sm text-gray-600">
              Aucune salle n'a encore été créée. Créez votre première salle
              pour commencer la gestion.
            </p>

            {/* Bouton d'appel à l'action */}
            <Link href="/adminBni/nouvelle-salle">
              <Button className="mt-6 bg-[#0F2E25] text-white hover:bg-[#0F2E25]/90">
                <Plus className="mr-2 h-4 w-4 text-white" />
                Ajouter une salle
              </Button>
            </Link>
          </div>
        ) : (
          // ===== LISTE DES SALLES =====
          // À compléter quand on aura l'API et la table
          <div className="p-6">
            <p className="text-sm text-gray-600">
              {salles.length} salle(s)
            </p>
            {/* TODO : afficher la table ou la grille des salles */}
          </div>
        )}
      </div>
    </div>
  );
}



