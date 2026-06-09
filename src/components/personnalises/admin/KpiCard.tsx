"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ===== TYPES =====
type Badge = {
  label: string;
  couleur: string;
};

type KpiCardProps = {
  icon: LucideIcon;
  titre: string;
  valeur: string | number;
  tendance?: number;
  description?: string;
  badge?: Badge;
};

// ===== COMPOSANT =====
export default function KpiCard({
  icon: Icon,
  titre,
  valeur,
  tendance,
  description,
  badge,
}: KpiCardProps) {
  const tendancePositive = tendance !== undefined && tendance > 0;
  const tendanceNegative = tendance !== undefined && tendance < 0;

  return (
    // ===== AJOUT : flex-col + justify-between + min-height fixe =====
    // Ça garantit que :
    // - Toutes les cartes ont la même hauteur (140px minimum)
    // - L'icône/titre reste en haut, la valeur/description en bas
    // - Le contenu reste bien aligné même si le titre fait 2 lignes
    <div className="flex min-h-[140px] flex-col justify-between rounded-xl bg-white p-4">
      {/* ===== HEADER : icône + titre à gauche, tendance/badge à droite ===== */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-gray-500" strokeWidth={1.75} />
          <span className="text-xs text-gray-600 leading-tight">{titre}</span>
        </div>

        {badge ? (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${badge.couleur}`}
          >
            {badge.label}
          </span>
        ) : tendance !== undefined ? (
          <div className="flex shrink-0 items-center gap-0.5 text-[11px] font-semibold">
            {tendancePositive && (
              <>
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+{tendance}%</span>
              </>
            )}
            {tendanceNegative && (
              <>
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-red-600">{tendance}%</span>
              </>
            )}
          </div>
        ) : null}
      </div>

      {/* ===== VALEUR + DESCRIPTION (regroupées en bas grâce au justify-between) ===== */}
      <div>
        <p className="text-3xl font-semibold leading-none text-bni-text">
          {valeur}
        </p>
        {description && (
          <p className="mt-2 text-xs text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}
