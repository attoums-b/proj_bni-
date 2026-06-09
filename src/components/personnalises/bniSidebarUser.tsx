"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusCircle,
  Calendar,
  ClipboardList,
} from "lucide-react";

const navigation = [
  {
    section: "PILOTAGE",
    items: [
      {
        label: "Accueil",
        href: "/utilisateurBni",
        icon: Home,
      },
      {
        label: "Planning",
        href: "/utilisateurBni/planning",
        icon: Calendar,
      },
      {
        label: "Mes réservations",
        href: "/utilisateurBni/mes-reservations",
        icon: ClipboardList,
      },
    ],
  },
];

export default function DemandeurSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[280px] flex-col bg-[var(--bni-main)] text-white">
      {/* HEADER */}
      <div className="px-7 pt-8 pb-6">
        <h1 className="text-2xl font-bold tracking-tight">BNI RESERVATIONS</h1>
        <p className="mt-1 text-sm font-medium opacity-80">Demandeurs</p>
        
      </div>

      {/* SÉPARATEUR */}
      <div className="mx-7 h-px bg-white/30" />

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((group) => (
          <div key={group.section} className="mb-8">
            <h2 className="mb-3 px-3 text-xs font-semibold tracking-wider opacity-90">
              {group.section}
            </h2>

            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-[#436851]"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <Icon size={20} strokeWidth={2} />
                      <span>{item.label}</span>
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