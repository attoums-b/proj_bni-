"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Users,
  Building,
  LayoutDashboard,
  ClipboardList,
  Home,
  ClipboardCheck,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutGridIcon,
  Shield,
} from "lucide-react";

// ===== STRUCTURE DE LA NAVIGATION =====
// Pour l'instant on affiche tout. Plus tard, on ajoutera un filtrage par rôle.
const navigation = [
  {
    section: "PILOTAGE",
    items: [
      {
        label: "Utilisateurs",
        href: "/espace/utilisateurs",
        icon: Users,
      },
      {
        label: "Sites",
        href: "/espace/site",
        icon: Building,
      },
      {
        label: "Tableau de bord",
        href: "/espace/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Gestion des rôles",
        href: "/espace/roles",
        icon: Shield,
      }
    ],
  },
  {
    section: "GESTION",
    items: [
      {
        label: "Mes réservations",
        href: "/espace/mes-reservations",
        icon: ClipboardList,
      },
      {
        label: "Gestion des salles",
        href: "/espace/gestion-salles",
        icon: Home,
      },
      {
        label: "Gestion des réservations",
        href: "/espace/gestion-reservations",
        icon: ClipboardCheck,
      },
      {
        label: "Planning",
        href: "/espace/planning",
        icon: Calendar,
      },
    ],
  },
  {
    section: "CONFIGURATION",
    items: [
      {
        label: "Paramètres",
        href: "/espace/parametres",
        icon: Settings,
      },
    ],
  },
];

// ===== COMPOSANT =====
export default function BniSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen flex-col bg-[#0F2E25] text-white transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      {/* ===== HEADER avec bouton toggle ===== */}
      <div className="flex items-center justify-between px-4 pt-8 pb-6">
        {!isCollapsed && (
          <div className="px-3">
            <h1 className="text-xl font-bold tracking-tight">BNI RESERVATIONS</h1>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition"
          aria-label={isCollapsed ? "Étendre le menu" : "Réduire le menu"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* ===== SÉPARATEUR ===== */}
      <div className={`h-px bg-white/30 ${isCollapsed ? "mx-3" : "mx-7"}`} />

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((group) => (
          <div key={group.section} className="mb-8">
            {/* Titre de section (caché en mode réduit) */}
            {!isCollapsed && (
              <h2 className="mb-3 px-3 text-xs font-semibold tracking-wider opacity-90">
                {group.section}
              </h2>
            )}

            {/* Liste des items de la section */}
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 rounded-xl py-3 text-sm font-medium transition ${
                        isCollapsed ? "justify-center px-2" : "px-3"
                      } ${
                        isActive ? "bg-[#436851]" : "hover:bg-white/10"
                      }`}
                    >
                      <Icon size={20} strokeWidth={2} className="flex-shrink-0" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}