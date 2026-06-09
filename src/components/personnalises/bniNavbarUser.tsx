"use client";

import { usePathname } from "next/navigation";
import { UserInfo } from "@/components/template/header/user-info";

// Mapping URL → titre affiché
const pageTitles: Record<string, string> = {
  "/utilisateurBni": "Accueil",
  "/utilisateurBni/nouvelle-reservation": "Nouvelle réservation",
  "/utilisateurBni/planning": "Planning",
  "/utilisateurBni/mes-reservations": "Mes réservations",
};
 
export default function DemandeurNavbar() {
  const pathname = usePathname();
  const currentPage = pageTitles[pathname] || "";

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* TITRE À GAUCHE */}
      <div>
        <p className="text-sm font-medium text-gray-700">
          Espace demandeur{currentPage && ` - ${currentPage}`}
        </p>
      </div>

      {/*  ZONE DROITE :Profil utilisateur (icone de profil ) */}
            <div className="flex items-center gap-4">
              {/* UserInfo (cercle initiales + menu déroulant) */}
              <UserInfo
                prenom="Emmanuel"
                nom="Blon"
                role="Utilisateur "
                initiales="AK"
              />
            </div>


    </header>
  );
}

