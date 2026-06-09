"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ===== TYPES =====
type DonneeSalle = {
  nomSalle: string;
  nbReservations: number;
};

// ===== DONNÉES FICTIVES =====
const donnees: DonneeSalle[] = [
  { nomSalle: "BNI Étude", nbReservations: 42 },
  { nomSalle: "Pack Av'nir", nbReservations: 28 },
  { nomSalle: "B.FREE", nbReservations: 21 },
  { nomSalle: "CARDLESS", nbReservations: 15 },
  { nomSalle: "BNI Online", nbReservations: 10 },
];

// ===== COULEURS (nuances de vert BNI) =====
const COULEURS = ["#0F2E25", "#1c8467", "#3d9b80", "#5fb29a", "#a8d4c4"];

// ===== COMPOSANT =====
export default function PieChartTopSalles() {
  const total = donnees.reduce((sum, item) => sum + item.nbReservations, 0);

  return (
    <div className="rounded-xl bg-white p-5 outline-none focus:outline-none focus-within:outline-none">
      {/* ===== EN-TÊTE ===== */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-bni-text">
          Top des salles réservées
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          Répartition des réservations par salle
        </p>
      </div>

      {/* ===== GRAPHIQUE ===== */}
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={donnees}
            cx="40%"
            cy="50%"
            innerRadius={45}
            outerRadius={80}
            paddingAngle={2}
            dataKey="nbReservations"
            nameKey="nomSalle"
          >
            {donnees.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COULEURS[index % COULEURS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "11px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number, name: string) => [
              `${value} (${((value / total) * 100).toFixed(1)}%)`,
              name,
            ]}
          />

          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", color: "#6b7280" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

