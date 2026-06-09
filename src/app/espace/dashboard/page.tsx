"use client";

import KpiCard from "@/components/personnalises/admin/KpiCard";
import BarChartOccupation from "@/components/personnalises/admin/BarChartOccupation";
import PieChartTopSalles from "@/components/personnalises/admin/PieChartTopSalles";
import { Button } from "@/components/template/shadcnblocs/button";
import { Calendar, Users, ClipboardCheck, Home, Download } from "lucide-react";

export default function TableauDeBordPage() {
  const kpis = [
    {
      icon: Calendar,
      titre: "Réservations cette semaine",
      valeur: 0,
      tendance: 5,
      description: "vs semaine dernière",
    },
    {
      icon: Users,
      titre: "Taux d'occupation",
      valeur: "0%",
      description: "Faible activité",
    },
    {
      icon: ClipboardCheck,
      titre: "En attente de validation",
      valeur: 1,
      badge: {
        label: "1 demande",
        couleur: "bg-red-500",
      },
    },
    {
      icon: Home,
      titre: "Salles actives",
      valeur: 5,
      description: "5 sur 5 disponibles",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* ===== EN-TÊTE AVEC BOUTON EXPORT ===== */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--bni-text)]">
            Tableau de bord
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Vue d'ensemble de l'activité
          </p>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter en PDF
        </Button>
      </div>

      {/* ===== GRILLE DES 4 KPI ===== */}
      {/* CHANGEMENT : auto-fit + minmax(220px, 1fr) */}
      {/* La grille s'adapte automatiquement à l'espace disponible :
          - Si la sidebar est fermée et qu'il y a la place → 4 colonnes
          - Si la sidebar est ouverte et l'espace est trop étroit → 2 colonnes (2x2)
          - Sur mobile → 1 colonne */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {kpis.map((kpi, index) => (
          <KpiCard
            key={index}
            icon={kpi.icon}
            titre={kpi.titre}
            valeur={kpi.valeur}
            tendance={kpi.tendance}
            description={kpi.description}
            badge={kpi.badge}
          />
        ))}
      </div>

      {/* ===== SECTION GRAPHIQUES & STATISTIQUES ===== */}
      <div className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-gray-600">
          Graphes & Statistiques
        </h2>

        {/* Même technique pour les graphiques :
            - 400px minimum par graphique
            - Si pas la place côte à côte → l'un sous l'autre */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          }}
        >
          <BarChartOccupation />
          <PieChartTopSalles />
        </div>
      </div>

      {/* ===== PLACEHOLDER POUR L'HISTORIQUE ===== */}
      <div className="mt-12">
        {/* TODO : Historique des réservations */}
      </div>
    </div>
  );
}