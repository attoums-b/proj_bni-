"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/template/shadcnblocs/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ===== TYPES =====
type Periode = "jour" | "semaine" | "mois";

type DonneeOccupation = {
  label: string;
  tauxOccupation: number;
};

// ===== DONNÉES FICTIVES =====
const donneesParPeriode: Record<Periode, DonneeOccupation[]> = {
  jour: [
    { label: "Lun", tauxOccupation: 45 },
    { label: "Mar", tauxOccupation: 62 },
    { label: "Mer", tauxOccupation: 78 },
    { label: "Jeu", tauxOccupation: 55 },
    { label: "Ven", tauxOccupation: 70 },
  ],
  semaine: [
    { label: "Sem. 1", tauxOccupation: 52 },
    { label: "Sem. 2", tauxOccupation: 68 },
    { label: "Sem. 3", tauxOccupation: 75 },
    { label: "Sem. 4", tauxOccupation: 60 },
  ],
  mois: [
    { label: "Janv", tauxOccupation: 58 },
    { label: "Févr", tauxOccupation: 64 },
    { label: "Mars", tauxOccupation: 72 },
    { label: "Avril", tauxOccupation: 68 },
    { label: "Mai", tauxOccupation: 80 },
    { label: "Juin", tauxOccupation: 75 },
  ],
};

// ===== COMPOSANT =====
export default function BarChartOccupation() {
  const [periode, setPeriode] = useState<Periode>("semaine");
  const donnees = donneesParPeriode[periode];

  return (
    <div className="rounded-xl bg-white p-5 outline-none focus:outline-none focus-within:outline-none">
      {/* ===== EN-TÊTE ===== */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-bni-text">
            Taux d'occupation des salles
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Évolution de l'utilisation des salles
          </p>
        </div>

        {/* Sélecteur de période — sans bordure */}
        <Select value={periode} onValueChange={(v) => setPeriode(v as Periode)}>
          <SelectTrigger className="h-8 w-28 border-0 bg-gray-50 text-xs shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jour">Par jour</SelectItem>
            <SelectItem value="semaine">Par semaine</SelectItem>
            <SelectItem value="mois">Par mois</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ===== GRAPHIQUE — couleur changée en #0F2E25 ===== */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={donnees} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="label"
            stroke="#9ca3af"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "11px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number) => [`${value}%`, "Taux"]}
          />
          {/* COULEUR CHANGÉE EN #0F2E25 */}
          <Bar
            dataKey="tauxOccupation"
            fill="#0F2E25"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}