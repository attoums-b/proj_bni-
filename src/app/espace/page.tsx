import { Card, CardContent } from "@/components/template/shadcnblocs/card";
import Link from "next/link";
import { Calendar, ClipboardList, LayoutDashboard } from "lucide-react";

export default function EspacePage() {

  const liensRapides = [
    {
      titre: "Tableau de bord",
      description: "Vue d'ensemble de l'activité",
      href: "/espace/dashboard",
      icon: LayoutDashboard,
    },
    {
      titre: "Nouvelle réservation",
      description: "Faire une demande de salle",
      href: "/espace/nouvelle-reservation",
      icon: Calendar,
    },
    {
      titre: "Mes réservations",
      description: "Consulter mes demandes",
      href: "/espace/mes-reservations",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* ===== TITRE D'ACCUEIL ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--bni-text)]">
          Bienvenue sur BNI Réservations
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Plateforme de gestion des salles du centre intégré
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liensRapides.map((lien) => {
          const Icon = lien.icon;
          return (
            <Link key={lien.href} href={lien.href}>
              <Card className="cursor-pointer transition hover:border-[var(--bni-main)] hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bni-light)]">
                    <Icon className="h-6 w-6 text-[var(--bni-main)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--bni-text)]">
                      {lien.titre}
                    </h3>
                    <p className="text-sm text-gray-500">{lien.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
